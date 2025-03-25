package com.example.tourio
import android.graphics.Bitmap
import android.graphics.Canvas
import android.graphics.drawable.BitmapDrawable
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.widget.ImageView
import android.widget.TextView
import androidx.appcompat.app.AppCompatActivity
import org.osmdroid.api.IMapController
import org.osmdroid.config.Configuration
import org.osmdroid.views.MapView
import org.osmdroid.views.overlay.Marker
import org.osmdroid.util.GeoPoint
import org.osmdroid.tileprovider.tilesource.TileSourceFactory

class MapsPageActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_mapspage)

        // OSMDroid configuration
        Configuration.getInstance().userAgentValue = packageName

        val mapView: MapView = findViewById(R.id.mapView)
        mapView.setTileSource(TileSourceFactory.MAPNIK)
        mapView.setBuiltInZoomControls(true)
        mapView.setMultiTouchControls(true)

        // set map controllers
        val mapController: IMapController = mapView.controller
        val startPoint = GeoPoint(7.956, 80.783)
        mapController.setZoom(10)
        mapController.setCenter(startPoint)

        // Create the marker
        val marker = Marker(mapView)
        marker.position = startPoint
        marker.title = "Sigiriyaa, Lanka"

        // Inflate the custom layout for the marker
        val inflater = LayoutInflater.from(this)
        val markerView = inflater.inflate(R.layout.custom_map_marker, null)

        val iconImageView: ImageView = markerView.findViewById(R.id.marker_icon)
        val labelTextView: TextView = markerView.findViewById(R.id.marker_label)

        iconImageView.setImageResource(R.drawable.ic_map)
        labelTextView.text = "Sigiriya, Sri Lanka"

        // Convert the marker view to a Bitmap
        val markerBitmap = getBitmapFromView(markerView)

        val markerDrawable = BitmapDrawable(resources, markerBitmap)
        marker.icon = markerDrawable

        marker.setAnchor(Marker.ANCHOR_CENTER, Marker.ANCHOR_BOTTOM)

        // add marker to map
        mapView.overlays.add(marker)
    }

    private fun getBitmapFromView(view: View): Bitmap {
        view.measure(
            View.MeasureSpec.makeMeasureSpec(0, View.MeasureSpec.UNSPECIFIED),
            View.MeasureSpec.makeMeasureSpec(0, View.MeasureSpec.UNSPECIFIED)
        )
        // layout the view
        view.layout(0, 0, view.measuredWidth, view.measuredHeight)

        val bitmap = Bitmap.createBitmap(view.measuredWidth, view.measuredHeight, Bitmap.Config.ARGB_8888)
        val canvas = Canvas(bitmap)
        view.draw(canvas)

        return bitmap
    }
}

