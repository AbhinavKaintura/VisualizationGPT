import os
import json
from pathlib import Path
from typing import List, Dict, Optional

class ConversationMemoryManager:
    def __init__(self):
        """Initialize the conversation memory manager."""
        self.max_conversations = 3
        self.memory_file = "conversation_memory.json"

    def _load_conversations(self, file_path: str) -> List[Dict]:
        """Load existing conversations from file."""
        try:
            if os.path.exists(file_path):
                with open(file_path, 'r', encoding='utf-8') as file:
                    return json.load(file)
            return []
        except json.JSONDecodeError:
            return []
        except Exception as e:
            print(f"Error loading conversations: {str(e)}")
            return []

    def _save_conversations(self, file_path: str, conversations: List[Dict]) -> bool:
        """Save conversations to file."""
        try:
            with open(file_path, 'w', encoding='utf-8') as file:
                json.dump(conversations, file, indent=4, ensure_ascii=False)
            return True
        except Exception as e:
            print(f"Error saving conversations: {str(e)}")
            return False

    def update_conversation_memory(self, user_query: str, ai_response: str) -> bool:
        """
        Update the conversation memory for a user.
        
        Args:
            user_query: The user's query
            ai_response: The AI's response
        
        Returns:
            bool: True if successful, False otherwise
        """
        file_path = 'conversation_memory.json'
        path = Path(file_path)
        # make sure that the file exists, if not, create it with Path
        if not path.exists():
            path.touch()
        
        conversations = self._load_conversations(file_path)
        
        # Create new conversation entry
        new_conversation = {
            "user": user_query,
            "assistant": ai_response
        }
            
        conversations.append(new_conversation)
        
        # Keep only the latest conversations based on max_conversations setting
        if len(conversations) > self.max_conversations:
            conversations = conversations[-self.max_conversations:]
            
        return self._save_conversations(file_path, conversations)

    def get_conversation_history(self, format_type: str = "string") -> Optional[str]:
        """
        Get the conversation history for a user.
        
        Args:
            format_type: The format to return ("string" or "raw")
        
        Returns:
            Optional[str]: Formatted conversation history or None if no history exists
        """
        file_path = 'conversation_memory.json'
        
        if not os.path.exists(file_path):
            return None
            
        conversations = self._load_conversations(file_path)
        
        if format_type == "raw":
            return conversations
            
        # Format as string
        conversation_history = []
        for message in conversations:
            conversation_entry = []
            for key, value in message.items():
                conversation_entry.append(f"{key}: {value}")
            conversation_history.append("\n".join(conversation_entry))
            
        return "\n\n".join(conversation_history)

    def clear_conversation_history(self) -> bool:
        """Clear all conversation history for a user."""
        file_path = 'conversation_memory.json'
        try:
            if os.path.exists(file_path):
                os.remove(file_path)
            return True
        except Exception as e:
            print(f"Error clearing conversation history: {str(e)}")
            return False
        

memory_manager = ConversationMemoryManager()

