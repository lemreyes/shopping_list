let loggingEnabled = false;

// Function to toggle logging
export function toggleLogging() {
  loggingEnabled = !loggingEnabled;
}

// Custom logging function
export function traceLog(...args: any[]) {
  if (loggingEnabled) {
    console.log(...args);
  }
}
