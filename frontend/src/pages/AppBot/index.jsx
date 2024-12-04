import React, { Component } from "react";
import ChatBot from "react-simple-chatbot";

class InvestingTrackerChatbot extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      userEmail: "",
      selectedProblem: "",
      steps: [
        {
          id: "welcome",
          message: `Hello there! I'm your Investing Tracker Chatbot. 🤖`,
          trigger: "need-help",
        },
        {
          id: "need-help",
          message: "Do you need help?",
          trigger: "help-options",
        },
        {
          id: "help-options",
          options: [{ value: "yes", label: "Yes", trigger: "ask-name" }],
        },
        {
          id: "ask-name",
          message: "May I know your name, please?",
          trigger: "get-name",
        },
        {
          id: "get-name",
          user: true,
          trigger: "greet-user",
          validator: (value) => {
            if (value && value.trim() !== "") {
              this.handleNameInput(value);
              return true;
            }
            return "Please enter your name.";
          },
        },
        {
          id: "greet-user",
          message: `Nice to meet you, {previousValue}! How can I assist you today?`,
          trigger: "select-problem",
        },
        {
          id: "select-problem",
          message: "Please select the problem you are facing:",
          trigger: "problem-options",
        },
        {
          id: "problem-options",
          options: [
            {
              value: "problem1",
              label: "I have doubts in ESG page",
              trigger: "confirm-problem",
            },
            {
              value: "problem2",
              label: "I have a problem with my account",
              trigger: "confirm-problem",
            },
            {
              value: "problem3",
              label: "I have a problem with the portfolio page",
              trigger: "confirm-problem",
            },
            {
              value: "problem4",
              label: "I have a problem in transaction history",
              trigger: "confirm-problem",
            },
            {
              value: "problem5",
              label: "I need clarity on Stock Info page",
              trigger: "confirm-problem",
            },
          ],
        },
        {
          id: "confirm-problem",
          message:
            "The Ticket has been raised for your problem. Please enter your email address to confirm:",
          trigger: "get-email",
        },
        {
          id: "get-email",
          user: true,
          trigger: "confirm-info",
          validator: (value) => {
            if (value && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
              this.handleEmailInput(value);
              return true;
            }
            return "Please enter a valid email address.";
          },
        },
        {
          id: "confirm-info",
          message:
            "Thank you for confirming your email. Our support team will contact you within 24 hours to assist with your issue.Have a good day :)",
          end: true,
        },
      ],
    };
  }

  handleNameInput = (name) => {
    this.setState({ userName: name });
  };

  handleEmailInput = (email) => {
    this.setState({ userEmail: email });
  };

  render() {
    return (
      <div className="investing-tracker-chatbot">
        <ChatBot floating={true} steps={this.state.steps} />
      </div>
    );
  }
}

export default InvestingTrackerChatbot;
