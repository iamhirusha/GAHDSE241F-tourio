package com.example.tourio

import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import org.osmdroid.api.IMapController
import org.osmdroid.views.MapView
import org.osmdroid.views.overlay.Marker
import org.osmdroid.config.Configuration
import org.osmdroid.tileprovider.tilesource.TileSourceFactory
import org.osmdroid.util.GeoPoint


class MapsPageActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_mapspage)

        // Initialize OSMDroid configuration
        Configuration.getInstance().userAgentValue = packageName

        val mapView: MapView = findViewById(R.id.mapView)
        mapView.setTileSource(TileSourceFactory.MAPNIK)
        mapView.setBuiltInZoomControls(true)
        mapView.setMultiTouchControls(true)

        val mapController: IMapController = mapView.controller
        val startPoint = GeoPoint(7.956, 80.783)
        mapController.setZoom(10)
        mapController.setCenter(startPoint)

        // Add marker
        val marker = Marker(mapView)
        marker.position = startPoint
        marker.title = "Sigiriya, Sri Lanka"
        mapView.overlays.add(marker)
    }
}
