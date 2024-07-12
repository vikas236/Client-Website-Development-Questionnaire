const url = "http://localhost:3000";

const serverW = (() => {
  async function getTable(table_name) {
    const requestData = {
      tableName: table_name,
    };

    return fetch(`${url}/table`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .catch((error) => {
        console.error("Error:", error);
        throw error; // Re-throw the error to be caught by the caller
      });
  }

  function createTable(table_name) {
    const requestData = {
      tableName: table_name,
    };

    return fetch(`${url}/create_table`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .catch((error) => {
        console.error("Error:", error);
        throw error; // Re-throw the error to be caught by the caller
      });
  }

  function removeTable(table_name) {
    const requestData = {
      tableName: table_name,
    };

    return fetch(`${url}/drop_table`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .catch((error) => {
        console.error("Error:", error);
        throw error; // Re-throw the error to be caught by the caller
      });
  }

  async function addData(table_name, questions) {
    const requestData = {
      tableName: table_name,
      questions: questions,
    };

    try {
      const response = await fetch(`${url}/add_data`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return await response.json();
    } catch (error) {
      console.error("Error:", error);
      throw error; // Re-throw the error to be caught by the caller
    }
  }

  function addColumn(table_name) {
    const requestData = {
      tableName: table_name,
    };

    return fetch(`${url}/add_column`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .catch((error) => {
        console.error("Error:", error);
        throw error; // Re-throw the error to be caught by the caller
      });
  }

  async function updatePosition(section_no, question_no) {
    const requestData = {
      section_no: section_no,
      question_no: question_no,
    };

    return fetch(`${url}/update_position`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .catch((error) => {
        console.error("Error:", error);
        throw error; // Re-throw the error to be caught by the caller
      });
  }

  async function updateAnswer(question, answer) {
    const requestData = {
      question: question,
      answer: answer,
    };

    return fetch(`${url}/update_answer`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .catch((error) => {
        console.error("Error:", error);
        throw error; // Re-throw the error to be caught by the caller
      });
  }

  async function getAnswer(question) {
    const requestData = {
      question: question,
    };

    return fetch(`${url}/get_answer`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .catch((error) => {
        console.error("Error:", error);
        throw error; // Re-throw the error to be caught by the caller
      });
  }

  async function truncateTable() {
    // Fetch column data from the backend and return a promise
    const response = await fetch(`${url}/truncate_table`);
    // Check if the response is successful
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    return await response.json();
  }

  return {
    getTable,
    createTable,
    removeTable,
    addData,
    truncateTable,
    updatePosition,
    updateAnswer,
    getAnswer,
  };
})();

export default serverW;
