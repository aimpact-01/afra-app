
import json
from tools.validation_tools import (
    validate_fund_code,
    validate_fund_name,
    validate_currency,
    validate_trader_code,
    validate_trader_name,
    validate_broker_code,
    validate_broker_name
)
from memory.memory_store import MemoryStore
from tools.bedrock_suggestion import get_field_suggestion


class FTBValidationAgent:
    def __init__(self):
        self.validation_results = []
        self.form_data = {}
        self.memory = MemoryStore()

    def receive_form(self, form_data: dict):
        print("FTB form received.")
        self.form_data = form_data

    def validate(self):
        print("Starting validation...")
        self.validation_results = []

        validations = {
            "fund_code": validate_fund_code,
            "fund_name": validate_fund_name,
            "currency": validate_currency,
            "trader_code": validate_trader_code,
            "trader_name": validate_trader_name,
            "broker_code": validate_broker_code,
            "broker_name": validate_broker_name
        }

        for field_name, validator in validations.items():
            if field_name not in self.form_data:
                continue  # Skip if not provided in payload

            value = self.form_data.get(field_name)

            if not value:
                result = {
                    "field": field_name,
                    "status": "invalid",
                    "reason": f"{field_name} is empty"
                }
                self.validation_results.append(result)
                print(f"Validation result for {field_name}: {result}")
                continue

            # Check if value already validated
            past_result = self.memory.recall(field_name, value)
            if past_result:
                self.validation_results.append(past_result)
                print(f"Memory hit for {field_name}: {past_result}")
                continue

            # Perform validation
            result = validator(value)

            # Get LLM suggestion if invalid
            if result["status"] == "invalid":
                try:
                    suggestion = get_field_suggestion(field_name, value, result["reason"])
                    result["suggestion"] = suggestion
                    print(f"LLM suggestion for {field_name}: {suggestion}")
                except Exception as e:
                    result["suggestion"] = f"LLM error: {str(e)}"
                    print(f"LLM suggestion failed: {str(e)}")

            # Save to memory and result list
            self.memory.save(
                field_name=field_name,
                value=value,
                status=result["status"],
                suggestion=result.get("suggestion")
            )
            self.validation_results.append(result)
            print(f"Validation result for {field_name}: {result}")

        print("Final validation results:")
        print(json.dumps(self.validation_results, indent=2))

    def get_results(self):
        return self.validation_results
