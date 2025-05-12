package com.example.tourio

import android.content.Intent
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ImageView
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import com.bumptech.glide.Glide

class TourBookingAdapter(
    private val tourBookingList: List<TourBooking>,
    private val onTourBookingClick: (String) -> Unit   // Callback for click handling
) : RecyclerView.Adapter<TourBookingAdapter.TourBookingViewHolder>() {

    inner class TourBookingViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {
        val tourTitleTextView: TextView = itemView.findViewById(R.id.hotelBookTourTitle)
        val tourUserIDTextView: TextView = itemView.findViewById(R.id.hotelBookTourUserID)
        val tourPriceTextView: TextView = itemView.findViewById(R.id.hotelBookTourPrice)
        val tourBookingDateTextView: TextView = itemView.findViewById(R.id.hotelBookTourDate)


        init {
            // card view click event
            itemView.setOnClickListener {

            }
        }
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): TourBookingViewHolder {
        val itemView = LayoutInflater.from(parent.context).inflate(R.layout.hotelbook_tour_item, parent, false)
        return TourBookingViewHolder(itemView)
    }

    override fun onBindViewHolder(holder: TourBookingViewHolder, position: Int) {
        val tourbooking = tourBookingList[position]
        holder.tourTitleTextView.text = tourbooking.tourTitle
        holder.tourUserIDTextView.text = tourbooking.userId
        holder.tourPriceTextView.text = tourbooking.tourPrice
        holder.tourBookingDateTextView.text = tourbooking.bookingDate

    }

    override fun getItemCount(): Int {
        return tourBookingList.size
    }
}
