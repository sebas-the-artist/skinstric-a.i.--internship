// src/app/test/scan/components/CameraCapture.tsx
"use client";

import { useEffect, useRef, useCallback } from "react";
import "../camera.css";

type CameraCaptureProps = {
  onCapture: (image: string) => void;
  onCancel: () => void;
};

export default function CameraCapture({ onCapture, onCancel }: CameraCaptureProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    console.log("🔥 CameraCapture FULL mounted");
    
    navigator.mediaDevices.getUserMedia({
      video: { facingMode: "user", width: { ideal: 640 }, height: { ideal: 480 } },
      audio: false,
    })
    .then((stream) => {
      console.log("✅ FULL Stream got");
      streamRef.current = stream;
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        console.log("✅ FULL Video srcObject set");
      }
    })
    .catch((err) => {
      console.error("❌ FULL Camera error:", err);
      onCancel();
    });

    return () => {
      console.log("🧹 FULL Cleaning up");
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
    };
  }, [onCancel]);

  const capture = useCallback(() => {
    console.log("📸 Capturing...");
    
    if (!videoRef.current || !canvasRef.current) {
      console.error("❌ No video/canvas");
      return;
    }

    const video = videoRef.current;
    const canvas = canvasRef.current;
    
    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;
    
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      console.error("❌ No canvas context");
      return;
    }
    
    ctx.drawImage(video, 0, 0);
    const imageData = canvas.toDataURL("image/jpeg", 0.9);
    
    console.log("✅ Image captured, calling onCapture");
    onCapture(imageData);
  }, [onCapture]);

  return (
    <div className="camera-container">
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className="camera-video"
      />
      <canvas ref={canvasRef} style={{ display: "none" }} />

      <div className="camera-overlay">
        <button className="capture-btn" onClick={capture}>
          <span className="capture-icon">📷</span>
        </button>
        <button className="cancel-btn" onClick={onCancel}>
          Cancel
        </button>
      </div>

      <div className="camera-instructions">
        <p className="camera-instructions-title">
          TO GET BETTER RESULTS MAKE SURE TO HAVE
        </p>
        <div className="camera-instructions-row">
          <span className="camera-instructions-dot">◇ NEUTRAL EXPRESSION </span>
          <span className="camera-instructions-dot">◇ FRONTAL POSE </span>
          <span className="camera-instructions-dot">◇ ADEQUATE LIGHTING ◇</span>
        </div>
      </div>
    </div>
  );
}
