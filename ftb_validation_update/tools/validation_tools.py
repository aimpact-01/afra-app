import re

# -------------------- FUND VALIDATIONS --------------------

def validate_fund_code(fund_code: str) -> dict:
    """
    Validates Fund Abbreviation/Code (Mandatory)
    - Max 30 characters
    - No white spaces
    - Must be in ALL CAPS
    - Allowed special characters: (.), (_), (>)
    """

    allowed_special = set(". _ >")

    if not fund_code:
        return {"field": "fund_code", "status": "invalid", "reason": "Fund code is required"}

    if len(fund_code) > 30:
        return {"field": "fund_code", "status": "invalid", "reason": "Fund code must be 30 characters or less"}

    if " " in fund_code:
        return {"field": "fund_code", "status": "invalid", "reason": "Fund code cannot contain white space"}

    if fund_code != fund_code.upper():
        return {"field": "fund_code", "status": "invalid", "reason": "Fund code must be in all uppercase"}

    for char in fund_code:
        if not (char.isalnum() or char in allowed_special):
            return {"field": "fund_code", "status": "invalid", "reason": f"Invalid character in fund code: {char}"}

    return {"field": "fund_code", "status": "valid"}

def validate_fund_name(fund_name: str) -> dict:
    """
    Validates Fund Name
    - Mandatory
    - Ideally ≤ 50 chars (for appsec)
    - Max allowed: 255 chars
    """
    if not fund_name:
        return {"field": "fund_name", "status": "invalid", "reason": "Fund name is required"}

    if len(fund_name) > 255:
        return {"field": "fund_name", "status": "invalid", "reason": "Fund name cannot exceed 255 characters"}

    if len(fund_name) > 50:
        return {"field": "fund_name", "status": "warning", "reason": "Fund name exceeds appsec display limit (50), but accepted"}

    return {"field": "fund_name", "status": "valid"}

def validate_currency(currency: str) -> dict:
    """
    Validates Currency
    - Default is USD
    - Can be changed (if needed)
    - Just check if it's present and 3 uppercase letters
    """
    if not currency:
        return {"field": "currency", "status": "invalid", "reason": "Currency is required"}

    if len(currency) != 3 or not currency.isupper():
        return {"field": "currency", "status": "invalid", "reason": "Currency must be a 3-letter uppercase code"}

    return {"field": "currency", "status": "valid"}

# -------------------- TRADER VALIDATIONS --------------------

def validate_trader_code(trader_code: str) -> dict:
    """
    Trader Abbreviation/Code
    - Max 9 chars
    - All CAPS
    - No white spaces
    - Allowed special: (-), (_)
    """
    if not trader_code:
        return {"field": "trader_code", "status": "invalid", "reason": "Trader code is required"}

    if len(trader_code) > 9:
        return {"field": "trader_code", "status": "invalid", "reason": "Max 9 characters allowed"}

    if " " in trader_code:
        return {"field": "trader_code", "status": "invalid", "reason": "Trader code cannot contain spaces"}

    if trader_code != trader_code.upper():
        return {"field": "trader_code", "status": "invalid", "reason": "Trader code must be in ALL CAPS"}

    if not re.match(r'^[A-Z0-9\-_]+$', trader_code):
        return {"field": "trader_code", "status": "invalid", "reason": "Trader code has unsupported characters"}

    return {"field": "trader_code", "status": "valid"}

def validate_trader_name(trader_name: str) -> dict:
    """
    Trader Name
    - Max 20 chars
    - Mandatory
    """
    if not trader_name:
        return {"field": "trader_name", "status": "invalid", "reason": "Trader name is required"}

    if len(trader_name) > 20:
        return {"field": "trader_name", "status": "invalid", "reason": "Trader name must be 20 characters or less"}

    return {"field": "trader_name", "status": "valid"}

# -------------------- BROKER VALIDATIONS --------------------

def validate_broker_code(broker_code: str) -> dict:
    """
    Broker Abbreviation/Code
    - Max 30 chars
    - All CAPS
    - No white spaces
    - Allowed special: (-), (_)
    """
    if not broker_code:
        return {"field": "broker_code", "status": "invalid", "reason": "Broker code is required"}

    if len(broker_code) > 30:
        return {"field": "broker_code", "status": "invalid", "reason": "Max 30 characters allowed"}

    if " " in broker_code:
        return {"field": "broker_code", "status": "invalid", "reason": "Broker code cannot contain spaces"}

    if broker_code != broker_code.upper():
        return {"field": "broker_code", "status": "invalid", "reason": "Broker code must be in ALL CAPS"}

    if not re.match(r'^[A-Z0-9\-_]+$', broker_code):
        return {"field": "broker_code", "status": "invalid", "reason": "Broker code has unsupported characters"}

    return {"field": "broker_code", "status": "valid"}

def validate_broker_name(broker_name: str) -> dict:
    """
    Broker Name
    - Max 20 chars
    - Mandatory
    """
    if not broker_name:
        return {"field": "broker_name", "status": "invalid", "reason": "Broker name is required"}

    if len(broker_name) > 20:
        return {"field": "broker_name", "status": "invalid", "reason": "Broker name must be 20 characters or less"}

    return {"field": "broker_name", "status": "valid"}
