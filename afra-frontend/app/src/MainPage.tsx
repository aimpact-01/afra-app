import * as Yup from 'yup'
import { Form, Formik } from 'formik'
import TitleBar from './components/TitleBar'
import { Box, Grid } from '@mui/material'
import UploadCardComponent from './components/FTBSetupCard/UploadCardComponent'
import KickoutTable from './components/Table/KickoutTable'
import StatusTrackModal from './components/Modal/StatusTrackModal'
import FormDemo from './components/FTBSetupCard/FormDemo'


// const data={
//     ko_id:'001',
//     type:'FTB_SETUP'
// }
// interface idata{
//     ko_id:string,
//     type:string
// }
// interface dataprops{
//     data: idata
// }
const MainPage =()=>{
  
    const handleSubmit = async (values: any) => {
        try {
            // const file = values.files[0]
            // const data: any = await readExcelFile(file)
            // modal.hide()
            // const gridData: any = await transformExceltoGrid(file)
            // detailPrompt.show({ refData, returnData: gridData, parentModal: modal })
        }
        catch (e) {
            // showErrorAlert('An error ocurred while reading the excel')
        }
    }


    const INITIAL_ADD_FORM_STATE = {
    
        files:[],
        
    }
    
    const FORM_VALIDATION = Yup.object().shape({
      
        files: Yup.mixed().test('required', 'Please select a file', (files: any) => files?.length > 0),
 
    })

    return(
        <div>
             <Formik<any>
                    onSubmit={handleSubmit}
                    initialValues={INITIAL_ADD_FORM_STATE}
                    validationSchema={FORM_VALIDATION}
                >
                    <Box >
                    <Form>
                    <TitleBar></TitleBar>xx
                    <Grid>
                    <UploadCardComponent ></UploadCardComponent>
                    <KickoutTable></KickoutTable>
                    <StatusTrackModal></StatusTrackModal>
                    </Grid>
                    </Form>
                    </Box>
                </Formik>
            
           
        </div>
    )
}

export default MainPage