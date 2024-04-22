from mediapipe.tasks import python as mp_python
from mediapipe.tasks.python import vision as mp_vision
import cv2
import mediapipe as mp
import pyautogui

# Setup MediaPipe
mp_hands = mp.solutions.hands
hands = mp_hands.Hands(min_detection_confidence=0.5,
                       min_tracking_confidence=0.5)
mp_drawing = mp.solutions.drawing_utils

# Import the necessary MediaPipe and tasks libraries

# Callback function to handle the gesture recognition results


def handle_gestures(result, output_image, timestamp_ms):
    global gesture_active  # Use global variable to manage state across frames
    for gesture_list in result.gestures:
        for gesture in gesture_list:
            print(
                f"Gesture: {gesture.category_name} with score {gesture.score}")
            if gesture.category_name == 'Open_Palm' and gesture.score > 0.5:
                if not gesture_active:  # Trigger only if gesture was not previously active
                    gesture_active = True
                    print("Open Palm Detected - Triggering Play/Pause")
                    pyautogui.press('space')
            elif gesture.category_name == 'Thumb_Up' and gesture.score > 0.5:
                if not gesture_active:  # Trigger only if gesture was not previously active
                    gesture_active = True
                    print("Thumb Up Detected - Triggering Right Arrow")
                    pyautogui.press('right')
            elif gesture.category_name == 'Thumb_Down' and gesture.score > 0.5:
                if not gesture_active:  # Trigger only if gesture was not previously active
                    gesture_active = True
                    print("Thumb Down Detected - Triggering Left Arrow")
                    pyautogui.press('left')
            elif gesture.category_name == 'Victory' and gesture.score > 0.5:
                if not gesture_active:  # Trigger only if gesture was not previously active
                    gesture_active = True
                    print("VictoryDetected - Triggering f")
                    pyautogui.press('f')
            elif gesture.category_name == 'Pointing_Up' and gesture.score > 0.5:
                # if not gesture_active:  # Trigger only if gesture was not previously active
                # gesture_active = True
                print("Pointing_Up Detected - Triggering Up Arrow")
                pyautogui.press('up')
            elif gesture.category_name == 'ILoveYou' and gesture.score > 0.5:
                # if not gesture_active:  # Trigger only if gesture was not previously active
                # gesture_active = True
                print("ILoveYou Detected - Triggering Down Arrow")
                pyautogui.press('down')

            else:
                gesture_active = False  # Reset the gesture state


# Initialize the Gesture Recognizer with a callback
options = mp_vision.GestureRecognizerOptions(
    base_options=mp_python.BaseOptions(
        model_asset_path='gesture_recognizer.task'),
    running_mode=mp_vision.RunningMode.LIVE_STREAM,
    result_callback=handle_gestures
)

recognizer = mp_vision.GestureRecognizer.create_from_options(options)

gesture_active = False  # State variable to track if the gesture is currently active


def main():
    cap = cv2.VideoCapture(0)  # Start video capture
    while cap.isOpened():
        success, frame = cap.read()
        if not success:
            print("Ignoring empty camera frame.")
            continue

        # Convert the image to RGB
        rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)

        # Process the image using MediaPipe
        results = hands.process(rgb_frame)

        # Send the frame for gesture recognition
        recognizer.recognize_async(
            mp.Image(image_format=mp.ImageFormat.SRGB, data=rgb_frame), cv2.getTickCount())

        # Draw landmarks
        if results.multi_hand_landmarks:
            for hand_landmarks in results.multi_hand_landmarks:
                mp_drawing.draw_landmarks(
                    frame, hand_landmarks, mp_hands.HAND_CONNECTIONS)

        # Display the current frame
        cv2.imshow('Gesture Recognition', frame)
        if cv2.waitKey(5) & 0xFF == 27:  # Exit on ESC
            break

    cap.release()
    cv2.destroyAllWindows()


if __name__ == "__main__":
    main()
