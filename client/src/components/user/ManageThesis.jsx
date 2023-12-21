import { Tabs, Button, Upload  } from 'antd';
import React, { useState } from 'react';
import { UploadOutlined } from '@ant-design/icons';


const onChange = (key) => {
    console.log(key);
};
const ManageThesis = () => {
    const [fileList, setFileList] = useState([
        {
          uid: '-1',
          name: 'xxx.png',
          status: 'done',
          url: 'http://www.baidu.com/xxx.png',
        },
      ]);
      const upload = () => {
        
        return(
            <Upload {...props} fileList={fileList}>
          <Button icon={<UploadOutlined />}>Upload</Button>
        </Upload>
        );
    };
    
      const handleChange = (info) => {
        let newFileList = [...info.fileList];
    
        // 1. Limit the number of uploaded files
        // Only to show two recent uploaded files, and old ones will be replaced by the new
        newFileList = newFileList.slice(-2);
    
        // 2. Read from response and show file link
        newFileList = newFileList.map((file) => {
          if (file.response) {
            // Component will show file.url as link
            file.url = file.response.url;
          }
          return file;
        });
        setFileList(newFileList);
      };
      const props = {
        action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
        onChange: handleChange,
        multiple: true,
      };
      
      return ( 
    <div >
        <Tabs
            style={{ border: '1px solid #ccc', padding: '16px' }}
            onChange={onChange}
            type="card"
            items={new Array(3).fill(null).map((_, i) => {
                const id = String(i + 1);
                return {
                    label: `Task ${id}`,
                    key: id,
                    children: [
                        'Put the content here \n',
                        upload()
                    ],

                };
          
            })} 
           
        />
        
    </div>
      );
};
export default ManageThesis;