package com.example.tourio

import android.content.Intent
import android.os.Bundle
import android.util.Log
import android.widget.ImageView
import android.widget.TextView
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.bumptech.glide.Glide
import com.google.firebase.firestore.FirebaseFirestore

class HotelProfileUserViewActivity : AppCompatActivity() {

    private lateinit var adapter: PredefinedTourAdapter
    private val preDefTourList = mutableListOf<PredefinedTour>()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_hotelprofileuserview)

        val userId = intent.getStringExtra("userId") ?: return
        fetchHotelDetails(userId)

        val recyclerView = findViewById<RecyclerView>(R.id.hotelProfileToursRecyclerView)
        recyclerView.layoutManager = LinearLayoutManager(this)

        adapter = PredefinedTourAdapter(preDefTourList) { preDefTourId ->
            // navigate user to hotel details page with userId
            val intent = Intent(this, BookTourActivity::class.java)
            intent.putExtra("preDefTourId", preDefTourId)
            startActivity(intent)
        }
        recyclerView.adapter = adapter

        fetchPreDefToursFromFirestore(userId)
    }

    private fun fetchHotelDetails(userId: String) {
        val db = FirebaseFirestore.getInstance()
        db.collection("Hotels").whereEqualTo("userId", userId).get()
            .addOnSuccessListener { result ->
                if (!result.isEmpty) {
                    // get firebase field data to values
                    val document = result.documents[0]
                    val hotelName = document.getString("hotelName")
                    val hotelAddress = document.getString("hotelAddress")
                    val hotelDes = document.getString("hotelDescription")
                    val hotelFacilities = document.getString("hotelFacilities")
                    val hotelImageUrl = document.getString("hotelCoverImgURL")

                    // set values to text fields in details page
                    findViewById<TextView>(R.id.hotelName).text = hotelName
                    findViewById<TextView>(R.id.hotelAddress).text = hotelAddress
                    findViewById<TextView>(R.id.hotelDes).text = hotelDes
                    findViewById<TextView>(R.id.hotelFacilities).text = hotelFacilities

                    val hotelCoverImage = findViewById<ImageView>(R.id.hotelUserViewProfileCoverImg)
                    if (!hotelImageUrl.isNullOrEmpty()) {
                        Glide.with(this)
                            .load(hotelImageUrl)  // load the image URL from Firebase
                            .into(hotelCoverImage) // display the image in ImageView
                    } else {
                        hotelCoverImage.setImageResource(R.drawable.img_defaultimage)  // default image
                    }
                } else {
                    Toast.makeText(this, "Cannot display hotel details", Toast.LENGTH_SHORT).show()
                }
            }
            .addOnFailureListener { e ->
                Toast.makeText(this, "Error getting hotel details: ${e.message}", Toast.LENGTH_SHORT).show()
            }
    }

    private fun fetchPreDefToursFromFirestore(userId: String) {
        val db = FirebaseFirestore.getInstance()
        db.collection("PredefinedTours")
            .whereEqualTo("hoteluserId", userId)
            .get()
            .addOnSuccessListener { result ->
                preDefTourList.clear()
                for (document in result) {
                    val preDefTour = document.toObject(PredefinedTour::class.java)
                    preDefTourList.add(preDefTour)
                }
                adapter.notifyDataSetChanged()
            }
            .addOnFailureListener { exception ->
                Log.e("FirestoreError", "Error fetching predefined tours", exception)
            }
    }
}