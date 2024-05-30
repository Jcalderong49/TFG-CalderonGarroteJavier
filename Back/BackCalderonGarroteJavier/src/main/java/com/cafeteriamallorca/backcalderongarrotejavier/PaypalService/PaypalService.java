package com.cafeteriamallorca.backcalderongarrotejavier.PaypalService;

import com.paypal.api.payments.*;
import com.paypal.base.rest.APIContext;
import com.paypal.base.rest.PayPalRESTException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Locale;

@Service  // Indica que esta clase es un servicio de Spring, gestionado por el contenedor de Spring
public class PaypalService {
    private final APIContext apiContext;  // APIContext es usado para configurar la conexión con PayPal

    public PaypalService(APIContext apiContext) {
        this.apiContext = apiContext;  // El APIContext es inyectado a través del constructor
    }

    public Payment createPayment(
            Double total,  // Total del pago
            String currency,  // Moneda en la que se realiza el pago
            String method,  // Método de pago, normalmente "paypal"
            String intent,  // Intención del pago, puede ser "sale", "authorize", etc.
            String description,  // Descripción de la transacción
            String cancelUrl,  // URL de redirección si el usuario cancela el pago
            String successUrl  // URL de redirección si el pago es exitoso
    ) throws PayPalRESTException {
        Amount amount = new Amount();
        amount.setCurrency(currency);  // Se establece la moneda
        amount.setTotal(String.format(Locale.forLanguageTag(currency), "%.2f", total));  // Se establece el total formateado

        Transaction transaction = new Transaction();
        transaction.setDescription(description);  // Se establece la descripción de la transacción
        transaction.setAmount(amount);  // Se añade el monto a la transacción

        List<Transaction> transactions = new ArrayList<>();
        transactions.add(transaction);  // Se añade la transacción a la lista de transacciones

        Payer payer = new Payer();
        payer.setPaymentMethod(method);  // Se establece el método de pago

        Payment payment = new Payment();
        payment.setIntent(intent);  // Se establece la intención del pago
        payment.setPayer(payer);  // Se añade el pagador
        payment.setTransactions(transactions);  // Se añade la lista de transacciones

        RedirectUrls redirectUrls = new RedirectUrls();
        redirectUrls.setReturnUrl(successUrl);  // Se establece la URL de redirección en caso de éxito
        redirectUrls.setCancelUrl(cancelUrl);  // Se establece la URL de redirección en caso de cancelación
        payment.setRedirectUrls(redirectUrls);  // Se añaden las URLs de redirección al pago

        return payment.create(apiContext);  // Se crea el pago usando el APIContext
    }

    public Payment executePayment(
            String paymentId,  // ID del pago a ejecutar
            String payerId  // ID del pagador
    ) throws PayPalRESTException {
        Payment payment = new Payment();
        payment.setId(paymentId);  // Se establece el ID del pago

        PaymentExecution paymentExecution = new PaymentExecution();
        paymentExecution.setPayerId(payerId);  // Se establece el ID del pagador

        return payment.execute(apiContext, paymentExecution);  // Se ejecuta el pago usando el APIContext y los detalles de la ejecución
    }
}
