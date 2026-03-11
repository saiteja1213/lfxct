from flask import Flask, render_template, request, redirect
import pyodbc
import pandas as pd

app = Flask(__name__)

conn = pyodbc.connect(
"DRIVER={ODBC Driver 17 for SQL Server};"
"SERVER=yourserver.database.windows.net;"
"DATABASE=predictiondb;"
"UID=admin;"
"PWD=password"
)

@app.route("/", methods=["GET","POST"])
def submit():

    matches = pd.read_sql(
    "SELECT match_name FROM matches WHERE match_date = CAST(GETDATE() AS DATE)",
    conn)

    if request.method == "POST":

        user = request.form["user"]
        match = request.form["match"]
        prediction = request.form["prediction"]
        bold = 1 if "bold" in request.form else 0

        cursor = conn.cursor()

        cursor.execute("""
        INSERT INTO predictions
        (username,match_name,prediction,bold)
        VALUES (?,?,?,?)
        """, user,match,prediction,bold)

        conn.commit()

        return redirect("/")

    return render_template("index.html", matches=matches)