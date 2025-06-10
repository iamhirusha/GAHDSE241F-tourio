package com.example.tourio

import android.content.Context
import android.content.Intent
import android.os.Bundle
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Button
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.fragment.app.Fragment
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.google.firebase.auth.FirebaseAuth
import com.google.firebase.firestore.FieldPath
import com.google.firebase.firestore.FirebaseFirestore

class HotelOngoingTourActivity : AppCompatActivity() {

    private lateinit var adapter: PredefinedTourAdapter
    private val preDefTourList = mutableListOf<PredefinedTour>()
    private val tourBookingMap = mutableMapOf<String, String>()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_hotelongoingtours)

        val recyclerView = findViewById<RecyclerView>(R.id.hotelOngoingToursRecyclerView)

        // Set LayoutManager with horizontal orientation
        recyclerView.layoutManager = LinearLayoutManager(this, LinearLayoutManager.HORIZONTAL, false)

        // Initialize the adapter and set the item click listener
        adapter = PredefinedTourAdapter(preDefTourList) { preDefTourId ->
            val tourBookingId = tourBookingMap[preDefTourId]
            val intent = Intent(this, OngoingTourActivity::class.java)
            intent.putExtra("preDefTourId", preDefTourId)
            intent.putExtra("tourBookingId", tourBookingId)
            startActivity(intent)
        }

        recyclerView.adapter = adapter

        // Fetch user tours from Firestore
        fetchUserToursFromFirestore()
    }

    private fun fetchUserToursFromFirestore() {
        val db = FirebaseFirestore.getInstance()
        val auth = FirebaseAuth.getInstance()
        val currentUser = auth.currentUser

        if (currentUser == null) {
            Toast.makeText(this, "User not logged in", Toast.LENGTH_SHORT).show()
            return
        }

        val userId = currentUser.uid

        // Get bookings for the current user
        db.collection("TourBookings")
            .whereEqualTo("hotelUserId", userId)
            .get()
            .addOnSuccessListener { bookingResult ->
                // map bookingId
                val preDefTourIds = bookingResult.documents.mapNotNull { doc ->
                    val preDefTourId = doc.getString("preDefTourId")
                    val tourBookingId = doc.id
                    if (preDefTourId != null) {
                        tourBookingMap[preDefTourId] = tourBookingId // map preDefTourId to bookingId
                        preDefTourId
                    } else null
                }

                if (preDefTourIds.isEmpty()) {
                    preDefTourList.clear()
                    adapter.notifyDataSetChanged()
                    Toast.makeText(this, "No tours booked by you", Toast.LENGTH_SHORT).show()
                    return@addOnSuccessListener
                }

                // Get PredefinedTours where ID is in preDefTourIds
                db.collection("PredefinedTours")
                    .whereIn(FieldPath.documentId(), preDefTourIds)
                    .get()
                    .addOnSuccessListener { tourResult ->
                        preDefTourList.clear()
                        for (document in tourResult) {
                            val tour = document.toObject(PredefinedTour::class.java)
                            preDefTourList.add(tour)
                        }
                        adapter.notifyDataSetChanged()
                    }
                    .addOnFailureListener { e ->
                        Toast.makeText(this, "Error getting tours: $e", Toast.LENGTH_SHORT).show()
                    }

            }
            .addOnFailureListener { e ->
                Toast.makeText(this, "Error getting bookings: $e", Toast.LENGTH_SHORT).show()
            }
    }

}
