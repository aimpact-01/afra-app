import boto3
import json
import os

# Create a Bedrock client
bedrock_client = boto3.client(
    service_name='bedrock-runtime',
    region_name='us-east-1'  # 🔁 Update if your region is different
)

def get_field_suggestion(field_name, value, reason):
    """
    Sends a prompt to the Anthropic Claude model via Bedrock to get a fix suggestion
    for an invalid field.
    """

    # Claude expects prompt in specific format: "\n\nHuman: ... \n\nAssistant:"
    prompt = (
        f"\n\nHuman: I have a form field that failed validation.\n"
        f"Field Name: {field_name}\n"
        f"Invalid Value: {value}\n"
        f"Reason for Invalidity: {reason}\n"
        f"Can you suggest a corrected or valid alternative?\n\nAssistant:"
    )

    try:
        response = bedrock_client.invoke_model(
            modelId="anthropic.claude-instant-v1",
            body=json.dumps({
                "prompt": prompt,
                "max_tokens_to_sample": 100,
                "temperature": 0.5,
                "top_k": 250,
                "top_p": 1,
                "stop_sequences": ["\n\nHuman:"]
            }),
            accept="application/json",
            contentType="application/json"
        )

        response_body = json.loads(response['body'].read())
        suggestion = response_body.get("completion", "").strip()

        return suggestion

    except Exception as e:
        return f"LLM error: {str(e)}"
