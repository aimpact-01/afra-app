from agents.ftb_validation_agent import FTBValidationAgent
import json

def lambda_handler(event, context):
    try:
        # Step 1: Extract 'details' from the incoming event
        form_data = event.get("details", {})

        if not form_data:
            return {
                "statusCode": 400,
                "error": "Missing 'details' object in payload"
            }

        # Step 2: Initialize the validation agent
        agent = FTBValidationAgent()

        # Step 3: Pass form data to the agent
        agent.receive_form(form_data)

        # Step 4: Run validation
        agent.validate()

        # Step 5: Return validation results
        return {
            "statusCode": 200,
            "body": json.dumps(agent.get_results(), indent=2)
        }

    except Exception as e:
        return {
            "statusCode": 500,
            "error": str(e)
        }


