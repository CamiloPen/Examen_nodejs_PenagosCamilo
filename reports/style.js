export const style = `
* 
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: sans-serif;
    transition: .7s;
}

body {
    background-color: #f4f4f4; 
    color: #333;
    line-height: 1.6;
}

.container {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 30px auto;
    gap: 30px;
    max-width: 1200px;
    padding: 20px;
}

h1 {
    margin-top: 40px;
    margin-bottom: 30px;
    text-align: center;
    color: #0056b3;
    font-size: 2.8em;
    text-shadow: 1px 1px #ddd;
}

.courses h2 {
    margin-top: 0;
    margin-bottom: 15px;
    color: #007bff;
    font-size: 2em;
    border-bottom: 2px solid #ccc;
    padding-bottom: 8px;
}

table {
    border-collapse: collapse;
    width: 100%;
    margin-top: 15px;
    border: 1px solid #ccc;
    border-radius: 8px;
    overflow: hidden;
}

th, td {
    border: 1px solid #ddd;
    text-align: left;
    padding: 12px;
}

th {
    background-color: #007bff;
    color: white;
    font-weight: bold;
}

tr:nth-child(even) {
    background-color: #eeefef;
}  `
