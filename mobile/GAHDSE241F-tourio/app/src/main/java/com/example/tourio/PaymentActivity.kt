package com.example.paymentapp

import android.os.Bundle
import android.view.View
import android.widget.*
import androidx.appcompat.app.AppCompatActivity
import com.example.tourio.R

class PaymentActivity : AppCompatActivity() {

    private lateinit var etCardNumber: EditText
    private lateinit var etExpiry: EditText
    private lateinit var etCVV: EditText
    private lateinit var paymentMethods: RadioGroup
    private lateinit var btnPay: Button

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_payment)

        etCardNumber = findViewById(R.id.etCardNumber)
        etExpiry = findViewById(R.id.etExpiry)
        etCVV = findViewById(R.id.etCVV)
        paymentMethods = findViewById(R.id.paymentMethods)
        btnPay = findViewById(R.id.btnPay)

        btnPay.setOnClickListener { processPayment() }
    }

    private fun processPayment() {
        val selectedMethodId = paymentMethods.checkedRadioButtonId
        if (selectedMethodId == -1) {
            Toast.makeText(this, "Please select a payment method", Toast.LENGTH_SHORT).show()
            return
        }

        val selectedMethod = findViewById<RadioButton>(selectedMethodId)
        val paymentMethod = selectedMethod.text.toString()

        if (paymentMethod == "Credit/Debit Card") {
            val cardNumber = etCardNumber.text.toString().trim()
            val expiry = etExpiry.text.toString().trim()
            val cvv = etCVV.text.toString().trim()

            if (cardNumber.isEmpty() || expiry.isEmpty() || cvv.isEmpty()) {
                Toast.makeText(this, "Please fill in all card details", Toast.LENGTH_SHORT).show()
                return
            }
        }

        Toast.makeText(this, "Payment Successful with $paymentMethod", Toast.LENGTH_SHORT).show()}
}