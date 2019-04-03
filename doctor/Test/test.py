import os
import time
from appium import webdriver

driver = webdriver.Remote(
    command_executor='http://127.0.0.1:4723/wd/hub',
    desired_capabilities={
        'app': os.path.expanduser('~/Projects/healthy1/doctor/android/app/build/outputs/apk/release/app-release-unsigned.apk'),
        'platformName': 'Android',
        'deviceName': 'Pixel API 28',
    })

try:
    time.sleep(3)
    edit_texts = driver.find_elements_by_class_name("android.widget.EditText")
    username = edit_texts[0]
    username.send_keys('doc1')
    password = edit_texts[1]
    password.send_keys('doc1')
    buttons = driver.find_elements_by_class_name("android.widget.Button")
    login_button = buttons[0]
    register_button = buttons[1]
    login_button.click()
    chat_button = driver.find_element_by_xpath('//*[@text="Chat"]')
    chat_button.click()
    time.sleep(2)
    button = driver.find_element_by_xpath('//*[contains(@text,"test1")]')
    button.click()
    time.sleep(3)
    chat_message = driver.find_element_by_xpath('//*[@text="Type a message..."]')
    chat_message.send_keys('Shreyas is sick')
    time.sleep(2)
    button = driver.find_element_by_xpath('//*[@text="Send"]')
    button.click()
    while True:
        time.sleep(5)
except KeyboardInterrupt:
    pass
finally:
    driver.quit()