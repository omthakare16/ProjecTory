# Hand gesture recognition for human-computer interaction

This project uses MediaPipe and OpenCV to develop a real-time gesture recognition system that controls YouTube video playback through hand gestures. By using the webcam, the system detects specific hand gestures and triggers corresponding actions such as play/pause, fast forward, rewind, and other controls on a YouTube video.

## Prerequisites

Before you begin, make sure you have the following installed:

- **Python 3.8+**: Ensure Python 3.8 or higher is installed.
- **OpenCV**: Used for camera operations and image processing.
- **MediaPipe**: Provides models and frameworks for gesture recognition.
- **pyautogui**: Allows for simulation of keyboard presses in response to gestures.

You can install the necessary Python packages via pip:


## Important
libraries to install for  script to run.

```bash
pip install opencv-python mediapipe pyautogui
```


## Setup

### Model Setup

Ensure that you have the correct MediaPipe gesture recognition model file (`gesture_recognizer.tflite`). Place this file in the same directory as your script, or update the script to include the appropriate path to where you've stored this model.

## Running the System

To run the gesture recognition system, follow these steps:

1. **Open a Terminal/Command Prompt**: Navigate to the directory containing your script.

2. **Execute the Script**: Run the following command in your terminal:



```bash
python gesture_control.py
```




## How to Use

Once the system is running, it will use your webcam to detect gestures. Here are the gestures and their corresponding actions:

- **Open Palm**: 🖐️ - Play/Pause the YouTube video. Show your open palm to the camera to toggle play/pause.
- **Thumb Up**: 👍 - Fast forward the video. Raise your thumb up to move the video forward.
- **Thumb Down**: 👎 - Rewind the video. Point your thumb down to rewind the video.
- **Victory Sign**: ✌️ - Trigger a specific function (e.g., 'f' key). Make a victory sign to activate this action.
- **Pointing Up**: ☝️ - Increase volume or navigate up. Point upwards to increase the volume or navigate in the interface.
- **RockStar Sign**: 🤟 - Decrease volume or navigate down. Use the 'I Love You' sign language gesture to decrease volume or navigate.

## Troubleshooting

If you encounter issues with gesture recognition accuracy:
- **Check the Lighting**: Ensure your room is well-lit but avoid direct sunlight on the camera.
- **Adjust the Camera**: Make sure the camera is steady and focused at an appropriate angle where your gestures can be easily seen.

For further assistance, review the code for parameters that can be adjusted for better performance, such as detection confidence thresholds.
