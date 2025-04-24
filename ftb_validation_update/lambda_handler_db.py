import json
import psycopg2
from agents.ftb_validation_agent import FTBValidationAgent


# Helper function to insert into the correct table
def insert_to_postgres(details):
    try:
        connection = psycopg2.connect(
            host="aimpact-afra-db.cupaxahi7rdo.us-east-1.rds.amazonaws.com",
            database="aimpactdb",
            user="postgres",
            password="password123"
        )
        cursor = connection.cursor()

        if "fund_code" in details and "fund_name" in details:
            cursor.execute("""
                INSERT INTO fund (code, name)
                VALUES (%s, %s)
            """, (details["fund_code"], details["fund_name"]))

        if "trader_code" in details and "trader_name" in details:
            cursor.execute("""
                INSERT INTO trader (code, name)
                VALUES (%s, %s)
            """, (details["trader_code"], details["trader_name"]))

        if "broker_code" in details and "broker_name" in details:
            cursor.execute("""
                INSERT INTO broker (code, name)
                VALUES (%s, %s)
            """, (details["broker_code"], details["broker_name"]))

        connection.commit()
        cursor.close()
        connection.close()
        return "Inserted into database successfully"

    except Exception as e:
        return f"Database Insert Error: {str(e)}"


# Lambda entry point
def lambda_handler(event, context):
    try:
        payload = event.get("details", {})
        if not payload:
            return {
                "statusCode": 400,
                "error": "No form data provided under 'details'"
            }

        agent = FTBValidationAgent()
        agent.receive_form(payload)
        agent.validate()
        validation_results = agent.get_results()

        # Only insert to DB if all fields are valid
        if all(result["status"] == "valid" for result in validation_results):
            db_response = insert_to_postgres(payload)
        else:
            db_response = "Skipped DB insert due to validation errors"

        return {
            "statusCode": 200,
            "body": json.dumps({
                "validation": validation_results,
                "database": db_response
            }, indent=2)
        }

    except Exception as e:
        return {
            "statusCode": 500,
            "error": str(e)
        }
