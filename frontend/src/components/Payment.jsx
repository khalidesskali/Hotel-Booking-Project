import { useState, useEffect } from "react";
import { FaCreditCard, FaPaypal } from "react-icons/fa";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css"; // Import the CSS for the skeleton
import { Button } from "./ui/button";
import axios from "axios";
import { useNavigate, useParams } from "react-router";

const Payment = () => {
  const [paymentType, setPaymentType] = useState("credit-card");
  const [creditCard, setCreditCard] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });
  const [paypalEmail, setPaypalEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    paypalEmail: "",
  });
  const [bookPrice, setBookPrice] = useState("");
  const [loading, setLoading] = useState(true);
  const [loading2, setLoading2] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    setErrors({
      cardNumber: "",
      expiryDate: "",
      cvv: "",
      paypalEmail: "",
    });
    setMessage("");
  }, [paymentType]);

  const validateCreditCard = () => {
    const newErrors = {
      cardNumber: "",
      expiryDate: "",
      cvv: "",
    };

    let isValid = true;

    // Card Number validation
    if (!creditCard.cardNumber.match(/^\d{16}$/)) {
      newErrors.cardNumber = "Card number must be 16 digits";
      isValid = false;
    }

    // Expiry Date validation
    if (!creditCard.expiryDate.match(/^(0[1-9]|1[0-2])\/?([0-9]{2})$/)) {
      newErrors.expiryDate = "Invalid expiry date (MM/YY)";
      isValid = false;
    }

    // CVV validation
    if (!creditCard.cvv.match(/^\d{3,4}$/)) {
      newErrors.cvv = "CVV must be 3 or 4 digits";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8000/api/bookings/${id}}`
        );
        setBookPrice(res.data.price);
      } catch (e) {
        console.error("an error has occured", e);
      } finally {
        setLoading(false);
      }
    };
    fetchBook();
  }, []);

  const validatePaypal = () => {
    const newErrors = {
      paypalEmail: "",
    };

    let isValid = true;

    // Email validation
    if (!paypalEmail.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
      newErrors.paypalEmail = "Invalid email address";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    let isValid = false;

    if (paymentType === "credit_card") {
      isValid = validateCreditCard();
    } else if (paymentType === "paypal") {
      isValid = validatePaypal();
    }

    if (!isValid) {
      return;
    }

    setLoading2(true);

    try {
      const response = await axios.post("http://localhost:8000/api/payments", {
        bookingId: id,
        paymentMethod: paymentType,
        amount: bookPrice,
      });
      setMessage(
        `Mock ${
          paymentType === "credit-card" ? "Credit Card" : "PayPal"
        } Payment Successful!`
      );
      const data = response.data.data;
      setTimeout(() => navigate(`/confirmation/${data.id}`), 2000);
    } catch (error) {
      console.error("An error has occurred:", error);
      setMessage("Payment failed. Please try again.");
    } finally {
      setLoading2(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Payment Page</h1>
        <div className="flex justify-around gap-6 mb-6">
          <button
            type="button"
            onClick={() => setPaymentType("credit_card")}
            className={`flex flex-col items-center p-4 rounded-lg border-2 w-1/2 ${
              paymentType === "credit_card"
                ? "border-blue-500 bg-blue-50"
                : "border-gray-200"
            } hover:bg-blue-50 transition-all`}
          >
            <FaCreditCard className="text-3xl text-blue-500" />
            <span className="mt-2 text-sm text-gray-700">Credit Card</span>
          </button>
          <button
            type="button"
            onClick={() => setPaymentType("paypal")}
            className={`flex flex-col items-center p-4 rounded-lg w-1/2 border-2 ${
              paymentType === "paypal"
                ? "border-yellow-500 bg-yellow-50"
                : "border-gray-200"
            } hover:bg-yellow-50 transition-all`}
          >
            <FaPaypal className="text-3xl text-yellow-500" />
            <span className="mt-2 text-sm text-gray-700">PayPal</span>
          </button>
        </div>
        {paymentType === "credit_card" && (
          <div className="space-y-4">
            <div>
              <label
                htmlFor="card-number"
                className="block text-sm font-medium text-gray-700"
              >
                Card Number
              </label>
              <input
                type="text"
                id="card-number"
                value={creditCard.cardNumber}
                onChange={(e) =>
                  setCreditCard({
                    ...creditCard,
                    cardNumber: e.target.value.replace(/\D/g, "").slice(0, 16),
                  })
                }
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                placeholder="1234 5678 9012 3456"
              />
              {errors.cardNumber && (
                <p className="text-red-500 text-sm mt-1">{errors.cardNumber}</p>
              )}
            </div>
            <div>
              <label
                htmlFor="expiry-date"
                className="block text-sm font-medium text-gray-700"
              >
                Expiry Date
              </label>
              <input
                type="text"
                id="expiry-date"
                value={creditCard.expiryDate}
                onChange={(e) =>
                  setCreditCard({
                    ...creditCard,
                    expiryDate: e.target.value
                      .replace(/[^0-9]/g, "")
                      .replace(/^(\d{2})(\d{0,2})/, "$1/$2")
                      .slice(0, 5),
                  })
                }
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                placeholder="MM/YY"
              />
              {errors.expiryDate && (
                <p className="text-red-500 text-sm mt-1">{errors.expiryDate}</p>
              )}
            </div>
            <div>
              <label
                htmlFor="cvv"
                className="block text-sm font-medium text-gray-700"
              >
                CVV
              </label>
              <input
                type="text"
                id="cvv"
                value={creditCard.cvv}
                onChange={(e) =>
                  setCreditCard({
                    ...creditCard,
                    cvv: e.target.value.replace(/\D/g, "").slice(0, 4),
                  })
                }
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                placeholder="123"
              />
              {errors.cvv && (
                <p className="text-red-500 text-sm mt-1">{errors.cvv}</p>
              )}
            </div>
          </div>
        )}
        {paymentType === "paypal" && (
          <div>
            <label
              htmlFor="paypal-email"
              className="block text-sm font-medium text-gray-700"
            >
              PayPal Email
            </label>
            <input
              type="email"
              id="paypal-email"
              value={paypalEmail}
              onChange={(e) => setPaypalEmail(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
              placeholder="example@paypal.com"
            />
            {errors.paypalEmail && (
              <p className="text-red-500 text-sm mt-1">{errors.paypalEmail}</p>
            )}
          </div>
        )}
        <div className="my-4 flex items-center justify-between">
          <span className="font-bold">Total price: </span>
          {loading ? (
            <Skeleton height={24} width={64} className="animate-pulse" />
          ) : (
            <span className="font-semibold">${bookPrice}</span>
          )}
        </div>
        <Button
          onClick={handleSubmit}
          disabled={loading2}
          className="w-full mt-6 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-blue-300"
        >
          {loading2 ? "Processing..." : "Submit Payment"}
        </Button>
        {message && (
          <div
            className={`mt-4 p-4 rounded-md ${
              message.startsWith("Mock")
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {message}
          </div>
        )}
      </div>
    </div>
  );
};

export default Payment;
