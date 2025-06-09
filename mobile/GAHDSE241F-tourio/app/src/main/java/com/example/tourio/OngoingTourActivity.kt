package com.example.tourio

import android.graphics.Color
import android.os.Bundle
import android.view.View
import android.widget.LinearLayout
import android.widget.ProgressBar
import android.widget.TextView
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import com.google.firebase.firestore.FirebaseFirestore

class OngoingTourActivity : AppCompatActivity() {

    private val statuses = listOf("visited", "visited", "notvisited", "notvisited", "notvisited")

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_ongoingtour)

        //val preDefTourId = intent.getStringExtra("preDefTourId") ?: return
        val preDefTourId = "UpuqDccLq3YeCdMoTuRM"
        fetchTourDetails(preDefTourId)
    }

    private fun fetchTourDetails(preDefTourId: String) {
        val db = FirebaseFirestore.getInstance()
        db.collection("PredefinedTours").whereEqualTo("preDefTourId", preDefTourId).get()
            .addOnSuccessListener { result ->
                if (!result.isEmpty) {
                    val doc = result.documents[0]
                    val title = doc.getString("tourTitle") ?: "Ongoing Tour"
                    val destinationNames = listOf(
                        doc.getString("destination1"),
                        doc.getString("destination2"),
                        doc.getString("destination3"),
                        doc.getString("destination4"),
                        doc.getString("destination5")
                    )

                    findViewById<TextView>(R.id.ongoingTourTitle).text = title

                    val container = findViewById<LinearLayout>(R.id.destinationListContainer)

                    destinationNames.forEachIndexed { index, name ->
                        val view = layoutInflater.inflate(R.layout.ongoingtour_destination_item, container, false)

                        val status = statuses.getOrNull(index) ?: "notvisited"

                        val destNumber = view.findViewById<TextView>(R.id.destinationNumber)
                        val destName = view.findViewById<TextView>(R.id.destinationName)
                        val statusText = view.findViewById<TextView>(R.id.statusText)
                        val circle = view.findViewById<View>(R.id.statusCircle)
                        val lineAbove = view.findViewById<View>(R.id.lineAbove)
                        val lineBelow = view.findViewById<View>(R.id.lineBelow)

                        destNumber.text = "Destination ${index + 1}"
                        destName.text = name ?: "N/A"
                        statusText.text = status.replaceFirstChar { it.uppercase() }

                        when (status) {
                            "visited" -> {
                                circle.setBackgroundResource(R.drawable.circle_blue)
                                statusText.setTextColor(Color.BLACK)
                                destName.setTextColor(Color.BLACK)
                                destNumber.setTextColor(Color.BLACK)
                                lineAbove.setBackgroundColor(Color.parseColor("#426AAD"))
                                lineBelow.setBackgroundColor(Color.parseColor("#426AAD"))
                            }
                            else -> {
                                val nextIndex = statuses.indexOf("notvisited")
                                if (index == nextIndex) {
                                    circle.setBackgroundResource(R.drawable.circle_lightblue)
                                } else {
                                    circle.setBackgroundResource(R.drawable.circle_gray)
                                }

                                statusText.setTextColor(Color.GRAY)
                                destName.setTextColor(Color.GRAY)
                                destNumber.setTextColor(Color.GRAY)
                                lineAbove.setBackgroundColor(Color.LTGRAY)
                                lineBelow.setBackgroundColor(Color.LTGRAY)
                            }
                        }

                        container.addView(view)
                    }
                }
            }
            .addOnFailureListener {
                Toast.makeText(this, "Error fetching tour", Toast.LENGTH_SHORT).show()
            }
    }
}
