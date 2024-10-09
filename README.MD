# Self-Driving Car Simulation

This project simulates a self-driving car using a neural network and sensor data. The car navigates a road with traffic autonomously, making real-time driving decisions based on sensor inputs.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Technical Details](#technical-details)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Autonomous Control**: The car is controlled entirely by an AI using a neural network.
- **Neural Network**: The AI uses a feedforward neural network to make driving decisions based on sensor data.
- **Traffic Simulation**: Simulate traffic on the road to test the car's ability to navigate.
- **Save and Load AI**: Save the best-performing AI model to local storage and load it for future use.
- **Visualization**: Visualize the neural network and sensor data in real-time.

## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/yourusername/self-driving-car-simulation.git
    cd self-driving-car-simulation
    ```

2. Open `index.html` in your web browser.

## Usage

- **AI Control**: The AI will automatically control the car.
- **Save AI**: Click the save button (💾) to save the best-performing AI model to local storage.
- **Discard AI**: Click the discard button (🗑️) to remove the saved AI model from local storage.

## Project Structure
plaintext
.
├── car.js # Car class and its methods
├── controls.js # Controls class for handling user input
├── index.html # Main HTML file
├── main.js # Main JavaScript file to initialize and animate the simulation
├── network.js # Neural network implementation
├── road.js # Road class and its methods
├── sensor.js # Sensor class for detecting obstacles
├── style.css # CSS for styling the page
├── traffic.json # JSON file containing traffic data
├── utils.js # Utility functions
└── visualizer.js # Visualization of the neural network

### Key Files

- **`car.js`**: Defines the `Car` class, which includes methods for updating the car's position, checking for damage, and drawing the car.
- **`controls.js`**: Defines the `Controls` class, which handles user input for controlling the car.
- **`main.js`**: Initializes the simulation, generates cars, loads traffic data, and handles the animation loop.
- **`network.js`**: Implements the neural network used by the AI to make driving decisions.
- **`road.js`**: Defines the `Road` class, which includes methods for drawing the road and getting lane centers.
- **`sensor.js`**: Defines the `Sensor` class, which detects obstacles using rays.
- **`visualizer.js`**: Contains functions for visualizing the neural network.
- **`utils.js`**: Contains utility functions for linear interpolation and intersection detection.
- **`traffic.json`**: Contains data for simulating traffic on the road.
- **`style.css`**: Styles the HTML elements.

## Technical Details

### Neural Network

The project uses a **feedforward neural network** to enable the AI to make driving decisions based on sensor data.

#### Structure

- **Input Layer**: Receives sensor data as inputs.
- **Hidden Layers**: Each neuron in a hidden layer computes a weighted sum of its inputs, adds a bias, and applies an activation function.
- **Output Layer**: Produces the final driving decisions (forward, backward, left, right) based on the processed data.

#### Feedforward Process

1. **Input to Hidden Layer**: Each neuron in the hidden layer receives inputs from all neurons in the previous layer (input layer), computes a weighted sum, adds a bias, and applies an activation function.
2. **Hidden Layer to Output Layer**: The outputs of the hidden layer neurons are fed as inputs to the neurons in the output layer, which then produce the final driving decisions.

#### Mutation

The `mutate` function introduces variability in the neural network by randomly adjusting the weights and biases. This is crucial for evolving the AI's performance over time.

### Sensor Data

The car's sensors detect obstacles and road borders, providing input data for the neural network. The `Sensor` class simulates the car's sensors using rays.

### Traffic Simulation

Traffic data is stored in a JSON file (`traffic.json`) and loaded into the simulation to create obstacles for the car.

### Visualization

The `Visualizer` class provides methods for visualizing the neural network, showing the connections and activations in real-time.


MIT License

Copyright (c) 2022 Radu Mariescu-Istodor

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.