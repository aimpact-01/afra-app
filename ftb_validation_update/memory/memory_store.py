# memory/memory_store.py

class MemoryStore:
    def __init__(self):
        self.memory = []

    def save(self, field_name: str, value: str, status: str, suggestion: str = None):
        """
        Save a validation record into memory.
        """
        self.memory.append({
            "field": field_name,
            "input": value,
            "status": status,
            "suggestion": suggestion
        })

    def recall(self, field_name: str, value: str):
        """
        Try to find a matching past validation.
        """
        for record in self.memory:
            if record["field"] == field_name and record["input"] == value:
                return record
        return None

    def show_memory(self):
        return self.memory
