# weather-widget
weather widget without any signup and api key using open-meteo
you can simply change icons in climacons folders

# Weather Widget
![FA](/screenshots/img1.jpg?raw=true "Optional Title")
![EN](/screenshots/img2.jpg?raw=true "Optional Title")

**Brief Description**: A simple weather widget without any signup and api key using open-meteo

## Table of Contents
1. [Introduction](#introduction)
2. [Features](#features)
3. [Installation](#installation)
4. [Usage](#usage)
5. [API Docs](#contributing)
6. [Contact](#contact)

## Introduction
- **What is this**: This is a simple widget for you project without signup and any problems.
- **is there any limits**: 600 API calls per minute | 5,000 API calls per hour | 10,000 API calls per day

## Features
- Simple , Light.
- No need to signup.
- Animated icons SVG.
- Multi Language : Fa , EN , RU
- Multi Temputure
- Persian Numbers and RTL styles for Persian language

## Installation
1. Download Zip File and extarct it
2. Put Styles in same directory with js file
3. Change Files directory depends on your projects
4. Change the location: Location is based on latitude and longitude change that on fetchWeatherData > url you can get that in docs downblow

## Usage
1. add <weather-widget></weather-widget> where you want to add widget
2. enjoy the widget
if you dont have the files in same directory you need to pass url to the function
example for django:
<weather-widget static-url="{% static 'dir/weather-widget' %}"></weather-widget>
dir is your path and weather-widget is your folder
if you dont know how to change function to use that path variable look at the example file
To change temputure or language just change these two variables : isCelsius - currentLang

## API Docs
[Open Meteo Docs](https://open-meteo.com/en/docs)

## Contact
email : saeed.masoodi@yahoo.com
