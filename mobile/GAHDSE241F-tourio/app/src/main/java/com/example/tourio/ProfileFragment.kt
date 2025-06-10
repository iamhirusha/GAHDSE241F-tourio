package com.example.tourio

import android.content.Intent
import android.os.Bundle
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Button
import android.widget.Toast
import androidx.fragment.app.Fragment
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.google.firebase.auth.FirebaseAuth
import com.google.firebase.firestore.FieldPath
import com.google.firebase.firestore.FirebaseFirestore

class ProfileFragment : Fragment() {

    private lateinit var adapter: PredefinedTourAdapter
    private val preDefTourList = mutableListOf<PredefinedTour>()
    private val tourBookingMap = mutableMapOf<String, String>()

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        // Inflate the layout for this fragment
        val rootView = inflater.inflate(R.layout.activity_travelerprofile, container, false)

        val recyclerView = rootView.findViewById<RecyclerView>(R.id.travelerProfileToursRecyclerView)

        // set LayoutManager with horizontal orientation
        recyclerView.layoutManager = LinearLayoutManager(requireContext(), LinearLayoutManager.HORIZONTAL, false)

        // Initialize the adapter and set the item click listener
        adapter = PredefinedTourAdapter(preDefTourList) { preDefTourId ->
            val tourBookingId = tourBookingMap[preDefTourId]
            val intent = Intent(activity, OngoingTourActivity::class.java)
            intent.putExtra("preDefTourId", preDefTourId)
            intent.putExtra("tourBookingId", tourBookingId)
            startActivity(intent)
        }


        recyclerView.adapter = adapter

        // Fetch user tours from Firestore
        fetchUserToursFromFirestore()

        // Find the logout button
        val logOutButton = rootView.findViewById<Button>(R.id.travelerLogoutButton)

        logOutButton.setOnClickListener {
            // Log the user out of Firebase Authentication
            FirebaseAuth.getInstance().signOut()

            // Clear any other session data
            val sharedPreferences = requireActivity().getSharedPreferences("AppPrefs", android.content.Context.MODE_PRIVATE)
            sharedPreferences.edit().clear().apply()

            // Log the logout
            Log.d("Logout", "User has logged out")

            // Redirect to the Get Started or Login page
            val intent = Intent(requireActivity(), MainActivity::class.java)
            intent.flags = Intent.FLAG_ACTIVITY_NEW_TASK or Intent.FLAG_ACTIVITY_CLEAR_TASK // Clear back stack
            startActivity(intent)

            // Finish the current activity
            requireActivity().finish()
        }

        return rootView
    }

    private fun fetchUserToursFromFirestore() {
        val db = FirebaseFirestore.getInstance()
        val auth = FirebaseAuth.getInstance()
        val currentUser = auth.currentUser

        if (currentUser == null) {
            Toast.makeText(requireContext(), "User not logged in", Toast.LENGTH_SHORT).show()
            return
        }

        val userId = currentUser.uid

        // Get bookings for the current user
        db.collection("TourBookings")
            .whereEqualTo("userId", userId)
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
                    Toast.makeText(requireContext(), "No tours booked by you", Toast.LENGTH_SHORT).show()
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
                        Toast.makeText(requireContext(), "Error getting tours: $e", Toast.LENGTH_SHORT).show()
                    }

            }
            .addOnFailureListener { e ->
                Toast.makeText(requireContext(), "Error getting bookings: $e", Toast.LENGTH_SHORT).show()
            }
    }

}
