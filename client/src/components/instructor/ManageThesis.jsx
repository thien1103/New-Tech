
import { Tabs, Button, Table, Modal } from 'antd';
import React, { useRef, useState } from 'react';

const { TabPane } = Tabs;

const ManageThesis = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [activeKey, setActiveKey] = useState('1');
  const [panes, setPanes] = useState([
    { title: 'Tab 1', content: 'Initial Content', key: '1' },
  ]);
  const [editMode, setEditMode] = useState(false);
  const [editedContent, setEditedContent] = useState('');

  const newTabIndex = useRef(2);

  const handleTabChange = (key) => {
    setActiveKey(key);
    setEditMode(false);
  };

  const addTab = () => {
    const newActiveKey = `newTab${newTabIndex.current}`;
    const newPanes = [...panes];
    newPanes.push({ title: `Tab ${newTabIndex.current}`, content: '', key: newActiveKey });
    setPanes(newPanes);
    setActiveKey(newActiveKey);
    newTabIndex.current++;
  };

  const removeTab = (targetKey) => {
    let newActiveKey = activeKey;
    let newPanes = [...panes];
    newPanes = newPanes.filter((pane) => pane.key !== targetKey);

    if (targetKey === activeKey) {
      const index = newPanes.findIndex((pane) => pane.key !== targetKey);
      newActiveKey = newPanes[index]?.key || '1';
    }

    setPanes(newPanes);
    setActiveKey(newActiveKey);
  };
  const openModal = () => {
    setIsModalVisible(true);
  };
  const closeModal = () => {
    setIsModalVisible(false);
  };
  const handleTask = (record) => {
    // Show the select modal
    openModal();
  }

  const handleEdit = () => {
    setEditMode(true);
    const currentPane = panes.find((pane) => pane.key === activeKey);
    setEditedContent(currentPane?.content || '');
  };

  const handleSubmit = () => {
    const newPanes = [...panes];
    const index = newPanes.findIndex((pane) => pane.key === activeKey);
    if (index !== -1) {
      newPanes[index].content = editedContent;
      setPanes(newPanes);
    }
    setEditMode(false);
  };

  const handleContentChange = (event) => {
    setEditedContent(event.target.value);
  };
  const data = [
    {
        thesisID: "24",
        thesisName: "Quản lý nhà hàng",
        userName: "Dong, Phuoc, Tuan",
        specialization: "Networking",
        gvpb: "Nguyen Van A",
    },
];
const columns = [
    {
        title: "ID",
        dataIndex: "thesisID",
        key: "thesisID",
        align: "center",
    },
    {
        title: "Tên đề tài",
        dataIndex: "thesisName",
        key: "thesisName",
        align: "center",
    },
    {
        title: "Nhóm sinh viên",
        dataIndex: "userName",
        key: "userName",
        align: "center",
    },
    {
        title: "Chuyên ngành",
        dataIndex: "specialization",
        key: "specialization",
        align: "center",
    },
    {
        title: 'GVPB',
        dataIndex: 'gvpb',
        key: 'gvpb',
        align: 'center',
    },
    {
        title: "Action",
        dataIndex: "action",
        key: "action",
        align: "center",
        width: 100,
        render: (_, record) => {
    
            return (
              <div className="flex justify-center">
                <Button className="mr-2" type="default" onClick={() => handleTask(record)}>
                  Giao nhiệm vụ
                </Button>
              </div>
            );
          
        },
      },
];

  return (
    <div>
    <div className="font-bold text-xl mb-3">Các đề tài do bạn quản lý:</div>    
    <Table dataSource={data} columns={columns} bordered></Table>
    <Modal
        title=""
        visible={isModalVisible}
        onCancel={closeModal}
        footer={null}
        width = {600}
        bodyStyle={{ height: '500px', overflow: 'auto' }}
        style ={{
          position: "relative",
          top: 50,
          minWidth:30,
        }}
      >
        
        <div>
        <Tabs
        type="editable-card"
        activeKey={activeKey}
        onChange={handleTabChange}
        onEdit={(targetKey, action) => {
          if (action === 'add') {
            addTab();
          } else if (action === 'remove') {
            removeTab(targetKey);
          }
        }}
      >
        {panes.map((pane) => (
          <TabPane tab={pane.title} key={pane.key}>
            {editMode ? (
              <textarea
                value={editedContent}
                style={{ resize: 'none',
                    width: 500,
                    height: 300,
                    }}
                onChange={handleContentChange}
                className="border border-gray-300 p-2 rounded"
              />
            ) : (
              <div style={{width: 500, height: 300,}}>{pane.content}</div>
            )}
          </TabPane>
        ))}
      </Tabs>
      {!editMode && (
        <Button type="default" style={{position:"relative", top: 80}} onClick={handleEdit}>
          Edit
        </Button>
      )}
      {editMode && (
        <Button type="default" style={{position:"relative", top: 80,}} onClick={handleSubmit}>
          Submit
        </Button>
      )}
        </div>

      </Modal>
    </div>
  );
};

export default ManageThesis;


