package com.example.tourio

import android.annotation.SuppressLint
import android.graphics.Color
import android.os.Bundle
import android.util.Log
import android.view.View
import android.widget.LinearLayout
import android.widget.ProgressBar
import android.widget.TextView
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import com.google.firebase.firestore.FirebaseFirestore

class OngoingTourActivity : AppCompatActivity() {

    private var statusesLoaded = false
    private var tourDetailsLoaded = false

    private lateinit var statuses: List<String>
    private lateinit var destinationNames: List<String>
    private lateinit var destinationLatLongs: List<String>
    private var tourTitle: String = "Ongoing Tour"

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_ongoingtour)

        val preDefTourId = intent.getStringExtra("preDefTourId")
        val tourBookingId = intent.getStringExtra("tourBookingId")
        Log.d("FirestoreDebug", "Received tourBookingId: $tourBookingId")

        if (preDefTourId.isNullOrEmpty() || tourBookingId.isNullOrEmpty()) {
            Toast.makeText(this, "Missing tour data", Toast.LENGTH_SHORT).show()
            finish()
            return
        }
        fetchTourDetails(preDefTourId)
        fetchTourStatuses(tourBookingId)
    }

    private fun fetchTourStatuses(tourBookingId: String) {
        val db = FirebaseFirestore.getInstance()
        db.collection("TourBookings").document(tourBookingId)
            .get()
            .addOnSuccessListener { document ->
                if (document != null && document.exists()) {
                    statuses = listOf(
                        document.getString("des1status") ?: "notvisited",
                        document.getString("des2status") ?: "notvisited",
                        document.getString("des3status") ?: "notvisited",
                        document.getString("des4status") ?: "notvisited",
                        document.getString("des5status") ?: "notvisited"
                    )
                    statusesLoaded = true
                    checkIfReady()
                } else {
                    Log.e("FirestoreDebug", "TourBooking document does not exist for ID $tourBookingId")
                    Toast.makeText(this, "Tour statuses not found", Toast.LENGTH_SHORT).show()
                    finish()
                }
            }
            .addOnFailureListener {
                Toast.makeText(this, "Error fetching statuses", Toast.LENGTH_SHORT).show()
                finish()
            }
    }

    @SuppressLint("SetTextI18n")
    private fun fetchTourDetails(preDefTourId: String) {
        val db = FirebaseFirestore.getInstance()
        db.collection("PredefinedTours").whereEqualTo("preDefTourId", preDefTourId).get()
            .addOnSuccessListener { result ->
                if (!result.isEmpty) {
                    val doc = result.documents[0]
                    tourTitle = doc.getString("tourTitle") ?: "Ongoing Tour"
                    destinationNames = listOf(
                        doc.getString("destination1") ?: "N/A",
                        doc.getString("destination2") ?: "N/A",
                        doc.getString("destination3") ?: "N/A",
                        doc.getString("destination4") ?: "N/A",
                        doc.getString("destination5") ?: "N/A"
                    )

                    destinationLatLongs = listOf(
                        doc.getString("des1MapUrl") ?: "Unknown location",
                        doc.getString("des2MapUrl") ?: "Unknown location",
                        doc.getString("des3MapUrl") ?: "Unknown location",
                        doc.getString("des4MapUrl") ?: "Unknown location",
                        doc.getString("des5MapUrl") ?: "Unknown location"
                    )
                    tourDetailsLoaded = true
                    checkIfReady()
                } else {
                    Toast.makeText(this, "Tour details not found", Toast.LENGTH_SHORT).show()
                    finish()
                }
            }
            .addOnFailureListener {
                Toast.makeText(this, "Error fetching tour", Toast.LENGTH_SHORT).show()
                finish()
            }
    }

    // when both data sets are loaded
    @SuppressLint("SetTextI18n")
    private fun checkIfReady() {
        if (statusesLoaded && tourDetailsLoaded) {
            buildUI()
        }
    }

    @SuppressLint("SetTextI18n")
    private fun buildUI() {
        findViewById<TextView>(R.id.ongoingTourTitle).text = tourTitle

        val container = findViewById<LinearLayout>(R.id.destinationListContainer)

        destinationNames.forEachIndexed { index, name ->
            val view = layoutInflater.inflate(R.layout.ongoingtour_destination_item, container, false)

            val status = statuses.getOrNull(index) ?: "notvisited"
            val destlatLong = destinationLatLongs.getOrNull(index) ?: "Unknown location"

            val latLong = view.findViewById<TextView>(R.id.destinationNumber)
            val destName = view.findViewById<TextView>(R.id.destinationName)
            val statusText = view.findViewById<TextView>(R.id.statusText)
            val statusTextLable = view.findViewById<TextView>(R.id.statusTextLabel)
            val circle = view.findViewById<View>(R.id.statusCircle)
            val lineAbove = view.findViewById<View>(R.id.lineAbove)
            val lineBelow = view.findViewById<View>(R.id.lineBelow)

            latLong.text = destlatLong
            destName.text = name ?: "N/A"
            statusText.text = status.replaceFirstChar { it.uppercase() }

            when (status) {
                "visited" -> {
                    circle.setBackgroundResource(R.drawable.circle_blue)
                    statusText.setTextColor(Color.BLACK)
                    destName.setTextColor(Color.BLACK)
                    latLong.setTextColor(Color.BLACK)
                    lineAbove.setBackgroundColor(Color.parseColor("#426AAD"))
                    lineBelow.setBackgroundColor(Color.parseColor("#426AAD"))
                }
                else -> {
                    val nextIndex = statuses.indexOf("notvisited")
                    if (index == nextIndex) {
                        circle.setBackgroundResource(R.drawable.circle_lightblue)
                        lineAbove.setBackgroundColor(Color.parseColor("#426AAD"))
                        lineBelow.setBackgroundColor(Color.LTGRAY)
                    } else {
                        circle.setBackgroundResource(R.drawable.circle_gray)
                        lineAbove.setBackgroundColor(Color.LTGRAY)
                        lineBelow.setBackgroundColor(Color.LTGRAY)
                    }

                    statusText.setTextColor(Color.GRAY)
                    statusTextLable.setTextColor(Color.GRAY)
                    destName.setTextColor(Color.GRAY)
                    latLong.setTextColor(Color.GRAY)
                }
            }

            container.addView(view)
        }

        // update Progress
        val visitedCount = statuses.count { it == "visited" }
        val totalDestinations = 5
        val upcomingCount = totalDestinations - visitedCount
        val progressPercent = (visitedCount * 100) / totalDestinations

        findViewById<TextView>(R.id.progressPercentageText).text = "$progressPercent% of tour completed"
        findViewById<TextView>(R.id.visitedText).text = "$visitedCount destinations visited"
        findViewById<TextView>(R.id.upcomingText).text = "$upcomingCount upcoming destinations"
        findViewById<TextView>(R.id.centerPercentageText).text = "$progressPercent%"

        findViewById<ProgressBar>(R.id.circularProgressBar).progress = progressPercent
    }
}
