#!/bin/bash
# Generate tactical dashboard video from image

INPUT_IMAGE="public/note_embedded_ui.jpg"
OUTPUT_VIDEO="public/videos/dashboard-loop.mp4"
DURATION=10
RESOLUTION="1920x1080"

echo "Generating dashboard video..."

ffmpeg -y -loop 1 -i "$INPUT_IMAGE" -f lavfi -i "color=c=black:s=${RESOLUTION}:d=${DURATION}" -filter_complex "[0:v]scale=${RESOLUTION}:force_original_aspect_ratio=decrease,pad=${RESOLUTION}:(ow-iw)/2:(oh-ih)/2,setsar=1,format=yuv420p,zoompan=z='min(zoom+0.001,1.1)':d=${DURATION}*30:s=${RESOLUTION}:x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)'[v]" -map "[v]" -c:v libx264 -preset medium -crf 23 -pix_fmt yuv420p -movflags +faststart -t "$DURATION" "$OUTPUT_VIDEO"

echo "Video generated: $OUTPUT_VIDEO"
