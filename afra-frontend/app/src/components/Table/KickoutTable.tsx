import React, { useEffect, useState } from 'react';
import './KickoutTable.css';  
import { Card, Paper } from '@mui/material';
import { eventApiClient } from '../../ApiClient/eventApiClient';
import axios from 'axios';

// import collapsedata from'./CollapseData.json'

interface DataItem {
  kickout_id:string
  type:string 
   status: string
   priority: string
    created_at: string
    last_updated:string
}

interface parentTableProps{
data:DataItem[]
}

interface WorkflowStage {
  stage: string;
  status: string;
  timestamp: string | null;
  notes: string;
}

interface KickoutData {
  kickout_id: string;
  current_status: string;
  workflow_stages: WorkflowStage[];
}


const KickoutTable: React.FC = () => {
  const [kickouts, setKickouts] = useState<any>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const[detailKickout,setDetailKickout] = useState<any>([])
  const [selectedKickout, setSelectedKickout] = useState<KickoutData | null>(null);
  const [selectedKickoutId, setSelectedKickoutId] = useState<string>('');

  useEffect(() => {

    (async () => {
      try {
        const response = await fetch('https://ceefde25v6-vpce-00885819822df6078.execute-api.us-east-1.amazonaws.com/api/kickout/all', {mode:'cors'});
        const data= await response.json();
        setKickouts(data.kickouts)
      }
      catch (e) {
        console.log(e)
      }
      
   } )();
}, [])

const CollapsibleTable = ({ }) => {

  

  const handleKickoutSelect = (kickoutId: string) => {
    (async () => {
      try{
        setSelectedKickoutId(kickoutId);
      const detail = await fetch(`https://ceefde25v6-vpce-00885819822df6078.execute-api.us-east-1.amazonaws.com/api/kickout/${kickoutId}`, {mode:'cors'});
      const detailKickout= await detail.json();
      setDetailKickout(detailKickout)
      setIsModalOpen(true)
      
     
    }
      catch (e) {
        console.log(e)
      }
    } )();

  

  };
  
  const closeModal = () => {
    setIsModalOpen(false);
    setDetailKickout(null);
  };
  //get status color
  const getStatusColor = (status: string) => {
    switch (status.toUpperCase()) {
      case 'COMPLETED':
        return 'status-completed';
      case 'IN_PROGRESS':
        return 'status-in-progress';
      case 'PENDING':
        return 'status-pending';
      default:
        return '';
    }
  };


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
      <h4 style={{margin:'0',textAlign:'center'}}>Status Tracker</h4>
        <button className="modal-close" onClick={onClose}>×</button>
        <div>{content}</div>
      </div>
    </div>
  );
};



//Tble


  return (
    <div>
    <table className='collapsible-table'>
      <thead>
        <tr>
          <th>Kickout ID</th>
          <th>Type</th>
          <th>Status</th>
          <th>Priority</th>
          <th>Created At</th>
          <th>Last Updated</th>

        </tr>
      </thead>
      <tbody>
        {kickouts.map((item:any )=> (
          <React.Fragment key={item.kickout_id}>
            <tr>
              <td className='kickout-id' onClick={() => handleKickoutSelect(item.kickout_id)}>{item.kickout_id}</td>
              <td>{item.kickout_type}</td>
              <td>{item.status}</td>
              <td>{item.priority}</td>
              <td>{item.created_at}</td>
              <td>{item.last_updated}</td>

            </tr>
          </React.Fragment>
        ))}
      </tbody>
    </table>
    <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        content={
          detailKickout && (
            <div>
              <table className='collapsible-table'>
      <thead>
      <p><strong>Kickout ID:</strong> {detailKickout?.kickout_id}</p>
      {/* <p><strong>Current Status:</strong> {?.current_status}</p> */}
        <tr>
          <th>Stage</th>
          <th>Status</th>
          <th>Timestamp</th>
          <th>Notes</th>

        </tr>
      </thead>
      <tbody>
          <React.Fragment >
            {detailKickout?.workflow?.map((stage:any)=>(
              <tr>
              <td>{stage.stage}</td>
              <td className={getStatusColor(stage.status)}>
                {stage.status}
              </td>
              <td>{stage.timestamp || 'N/A'}</td>
              <td>{stage.notes}</td>
            </tr>
            )

            )}
          </React.Fragment>
        
        {/* )} */}
      </tbody>
    </table>
           
            </div>
          )
        }
      />
    </div>
  );
};

// Example usage:


 
 


  return (
    <Paper sx={{height:'40%',width:'100%',marginTop:'0.5rem',marginLeft:'1rem',overflow:'hidden'}} >
    <div>
      <h3 style={{margin:'10px 0',textAlign:'center'}}>KickoutTable</h3>
      <CollapsibleTable   />
    </div>
    </Paper>
  );
};

export default KickoutTable;