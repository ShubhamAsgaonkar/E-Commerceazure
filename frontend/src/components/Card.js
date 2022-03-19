import "../style/Overlay.css";


// function to implement googlepay payment
const googlePay = () => {
    const paymentRequest = {
        apiVersion: 2,
        apiVersionMinor: 0,
        allowedPaymentMethods: [{
            type: 'CARD',
            parameters: {
                allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
                allowedCardNetworks: ['AMEX', 'DISCOVER', 'JCB', 'MASTERCARD', 'VISA'],
            },
        }],
        cardRequirements: {
            allowedCardNetworks: ['AMEX', 'DISCOVER', 'JCB', 'MASTERCARD', 'VISA'],
            allowedCardAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
        },
        transactionInfo: {
            totalPriceStatus: 'FINAL',
            totalPrice: '0.01',
            currencyCode: 'USD',
        },
    };

}

const Card = () => {
    return (
       <>
       {googlePaymentRequest()}
       </>
    );
}

export default Card;