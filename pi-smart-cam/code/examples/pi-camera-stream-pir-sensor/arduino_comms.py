#!/usr/bin/env python3
#Description: Arduino -> Pi Comms for reading PIR Sensor Values

import serial
import time
from email_notification import sendMessage
import sys
from camera import VideoCamera
import threading

lock = threading.Lock()
detected = [False]

def take_picture(pi_email, pi_app_password, pi_port, pi_host, frame):
    try:
        sendMessage(pi_email, pi_app_password, pi_port, pi_host, frame)
    except:
        print("Error Sending Notification: ", sys.exc_info()[0])

def arduino_pi_comms(ser, sensitivity_timer, current_time, pi_email, pi_app_password, pi_port, pi_host, frame):
    while True:
        if ser.in_waiting > 0:
            read_line = ser.readline()
            # print("RL:", read_line)
            line = read_line.decode('utf-8').rstrip()
            # print(line)
                
            # Change sensitivity_time to 10 seconds (default 30 seconds) to execute a motion trigger
            # print("Motion Detected | Sensitivity Timeout", sensitivity_timer, "|", "Time since last motion trigger",time.time()- current_time)
     
            
            if(line[:4] == 'M0S0'): 
                print("NO motion & NO sound", flush=True)


            elif(line[:4] == 'M0S1'): 
                print("NO motion & YES sound", flush=True)


            elif(line[:4] == 'M1S0'): 
                print("YES motion & NO sound", flush=True)


            elif(line[:4] == 'M1S1'): 
                print("YES motion & YES sound", flush=True)


            else:
                continue
            
            # # only send email notification if motion is detected after X seconds
            # if(int(time.time() - current_time) > sensitivity_timer):
                
            #     current_time = time.time()
            #     print("Arduino Output:", line) # print output from Arduino Comms
            #     if(detected[0] == True):
            #         with lock:
            #             detected[0] = False
            #         take_picture(pi_email, pi_app_password, pi_port, pi_host, frame)
                 

# local testing
# arduino_pi_comms(ser, sensitivity_timer, current_time, pi_email, pi_app_password, pi_port, pi_host)