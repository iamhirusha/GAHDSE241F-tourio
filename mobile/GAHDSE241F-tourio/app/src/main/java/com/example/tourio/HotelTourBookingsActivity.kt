package com.example.tourio

import android.annotation.SuppressLint
import android.content.Intent
import android.os.Bundle
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.core.content.ContentProviderCompat.requireContext
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.google.firebase.auth.FirebaseAuth
import com.google.firebase.firestore.FirebaseFirestore

class HotelTourBookingsActivity : AppCompatActivity() {

    private lateinit var adapter: TourBookingAdapter
    private val tourBookingList = mutableListOf<TourBooking>()

    @SuppressLint("MissingInflatedId")

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_hoteltourbookings)

        //val userId = intent.getStringExtra("userId") ?: return

        val recyclerView = findViewById<RecyclerView>(R.id.hotelProfileToursRecyclerView)
        recyclerView.layoutManager = LinearLayoutManager(this)

        adapter = TourBookingAdapter(tourBookingList) {

        }
        recyclerView.adapter = adapter

        fetchTourBookingsForHotelUser()
    }

    private fun fetchTourBookingsForHotelUser() {
        val db = FirebaseFirestore.getInstance()
        val auth = FirebaseAuth.getInstance()
        val currentUser = auth.currentUser

        if (currentUser == null) {
            Toast.makeText(this, "User not logged in", Toast.LENGTH_SHORT).show()
            return
        }

        val currentHotelUserId = currentUser.uid

        db.collection("TourBookings")
            .whereEqualTo("hotelUserId", currentHotelUserId)
            .get()
            .addOnSuccessListener { result ->
                tourBookingList.clear()
                for (document in result) {
                    val tourBooking = document.toObject(TourBooking::class.java)
                    tourBookingList.add(tourBooking)
                }
                adapter.notifyDataSetChanged()
            }
            .addOnFailureListener { e ->
                Toast.makeText(this, "Error getting bookings: ${e.message}", Toast.LENGTH_SHORT).show()
            }
    }

}