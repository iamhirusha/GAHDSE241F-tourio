package com.example.tourio

import android.content.Intent
import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Button
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.google.firebase.firestore.FirebaseFirestore

class RequestFragment : Fragment() {

    private lateinit var adapter: PubRequestAdapter
    private val pubRequestsList = mutableListOf<PubRequest>()

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        val binding = inflater.inflate(R.layout.activity_tourrequestpage, container, false)

        val newReqButton: Button = binding.findViewById(R.id.newRequestButton)

        // click listener for the button
        newReqButton.setOnClickListener {
            // Nav to NewRequestActivity
            val intent = Intent(activity, UserToursRequestFormActivity::class.java)
            startActivity(intent)
        }

        val recyclerView = binding.findViewById<RecyclerView>(R.id.pubreqrecyclerView)
        recyclerView.layoutManager = LinearLayoutManager(requireContext())

        adapter = PubRequestAdapter(pubRequestsList) {
        }

        recyclerView.adapter = adapter

        fetchRequestsFromFirestore()

        return binding
    }

    private fun fetchRequestsFromFirestore() {
        val db = FirebaseFirestore.getInstance()
        db.collection("TourRequests").get()
            .addOnSuccessListener { result ->
                pubRequestsList.clear()
                for (document in result) {
                    val pubRequest = document.toObject(PubRequest::class.java)
                    pubRequestsList.add(pubRequest)
                }
                adapter.notifyDataSetChanged()
            }
    }
}
