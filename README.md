# Expense Tracker

**Expense Tracker** is a web application that allows users to efficiently manage and track their expenses. Built with Flask and MongoDB for the backend and HTML/CSS for the frontend, this application offers a user-friendly interface and essential features for managing personal finances.

![image](https://github.com/user-attachments/assets/63bb4803-c3b6-49cf-8ed9-e935bfb1a79a)


## Features

- **User Authentication:** Sign up and log in to manage personal expenses.
- **Expense Management:** Add, edit, and delete expense entries.
- **Expense Overview:** View and manage expenses in a table format with sorting and filtering options.
- **Responsive Design:** A mobile-friendly interface for seamless use across various devices.

## Technologies Used

- **Backend:** Flask, MongoDB
- **Frontend:** HTML, CSS
- **JavaScript:** Vanilla JavaScript for modal functionality and form handling

## Setup Instructions

### Prerequisites

- Python 3.x
- MongoDB
- Node.js (optional, for development tools)

### Installation

1. **Clone the Repository:**

    ```bash
    git clone https://github.com/yourusername/expense-tracker.git
    cd expense-tracker
    ```

2. **Create a Virtual Environment:**

    ```bash
    python -m venv venv
    source venv/bin/activate  # On Windows use `venv\Scripts\activate`
    ```

3. **Install Dependencies:**

    ```bash
    pip install -r requirements.txt
    ```

4. **Configure Environment Variables:**

    Create a `.env` file in the root directory and add the following:

    ```
    SECRET_KEY=your_secret_key_here
    MONGO_URI=your_mongodb_connection_string_here
    ```

5. **Run the Application:**

    ```bash
    flask run
    ```

    The application will be accessible at `http://127.0.0.1:5000`.

## Usage

- **Adding Expenses:** Click the "Add Expense" button to open the modal form and enter expense details.
- **Editing Expenses:** Click the "Edit" button next to an expense to open the modal with current details and make changes.
- **Deleting Expenses:** Click the "Delete" button to remove an expense after confirming the action.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request with your changes. Ensure your code follows the project’s style guidelines and passes all tests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

For questions or suggestions, please reach out to [dheerajgupta1902@gmail.com](mailto:your-email@example.com).

