// Modal.tsx
import { useState } from 'react';
import './Modal.css';


interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  content: any;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, content }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>×</button>
        <div>{content}</div>
      </div>
    </div>
  );
};




// Table.tsx


interface DataItem {
  id: number;
  name: string;
  email: string;
  // Add other fields as needed
}

const Table: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedData, setSelectedData] = useState<DataItem | null>(null);

  // Sample data
  const data: DataItem[] = [
    // { id: 1, name: 'John Doe', email: 'john@example.com' },
    // { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
    // Add more data as needed
  ];

  const handleCellClick = (item: DataItem) => {
    setSelectedData(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedData(null);
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th></th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td onClick={() => handleCellClick(item)}>{item.id}</td>
              <td onClick={() => handleCellClick(item)}>{item.name}</td>
              <td></td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        content={
          selectedData && (
            <div>
              <h2></h2>
              <p></p>
              <p></p>
              <p></p>
            </div>
          )
        }
      />
    </div>
  );
};

export default Table;

// App.tsx
