import { useEffect } from "react";
import {
  FileExcelOutlined,
} from "@ant-design/icons";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Space } from "antd";
import { Table } from "ant-table-extensions";
import React, { useRef, useState } from "react";
import Highlighter from "react-highlight-words";

import "react-toastify/dist/ReactToastify.css";

import { useNavigate } from "react-router-dom";


function Table1() {
  const navigate = useNavigate();
  const handleNavigate = (e) => {
  navigate("/form");
  }

  

  const [dataSource, setDataSource] = useState([]);
 

  useEffect(() => {
    const getProject = async () => {
      try {
        const response = await fetch("http://localhost:5001/table", {
          headers: {
            "Content-Type": "application/json",
            
          },
        });
        
        const jsonData = await response.json();
        if(jsonData === "")
          setDataSource("")
        setDataSource(jsonData);
        
      } catch (err) {
        console.error(err.message);
      }
    }
    getProject();
  }, []);

  




 

  

  const [searchText, setSearchText] = useState("");
  const [searchTextGlobal, setSearchTextGlobal] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  
  

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div
        style={{
          padding: 8,
        }}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => {
              clearFilters();
              setSearchText("");
              confirm({
                closeDropdown: false,
              });
              setSearchedColumn(dataIndex);
              handleSearch("", confirm, dataIndex)
            }}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1890ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
        record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
      
    onFilterDropdownOpenChange: (open) => {
      if (open) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });



  const columns = [
    {
      key: "1",
      title: "Name",
      dataIndex: "name",
      sorter: (a, b) => {
        if (
          a &&
          a.name &&
          a.name.length &&
          b &&
          b.name &&
          b.name.length
        ) {
          return a.name.localeCompare(b.name);
          // return a.name.length - b.name.length;
        } else if (a && a.name && a.name.length) {
          // That means be has null name, so a will come first.
          return -1;
        } else if (b && b.name && b.name.length) {
          // That means a has null name so b will come first.
          return 1;
        }

        // Both rechargeType has null value so there will be no order change.
        return 0;
      },
      ...getColumnSearchProps("name"),
    },
    {
      key: "2",
      title: "Age/Sex",
      dataIndex: "age",
      sorter: (a, b) => {
        if (
          a &&
          a.age &&
          a.age.length &&
          b &&
          b.age &&
          b.age.length
        ) {
          return a.age.localeCompare(b.age);
          // return a.age.length - b.age.length;
        } else if (a && a.age && a.age.length) {
          // That means be has null age, so a will come first.
          return -1;
        } else if (b && b.age && b.age.length) {
          // That means a has null age so b will come first.
          return 1;
        }

        // Both rechargeType has null value so there will be no order change.
        return 0;
      },
      ...getColumnSearchProps("age"),
    },

    {
      key: "3",
      title: "Mobile",
      dataIndex: "mobile",
      sorter: (a, b) => {
        if (
          a &&
          a.mobile &&
          a.mobile.length &&
          b &&
          b.mobile &&
          b.mobile.length
        ) {
          return a.mobile.localeCompare(b.mobile);
          // return a.mobile.length - b.mobile.length;
        } else if (a && a.mobile && a.mobile.length) {
          // That means be has null mobile, so a will come first.
          return -1;
        } else if (b && b.mobile && b.mobile.length) {
          // That means a has null mobile so b will come first.
          return 1;
        }

        // Both rechargeType has null value so there will be no order change.
        return 0;
      },
      ...getColumnSearchProps("mobile"),
    },
    {
      key: "4",
      title: "Address",
      dataIndex: "address",
      sorter: (a, b) => {
        if (
          a &&
          a.address &&
          a.address.length &&
          b &&
          b.address &&
          b.address.length
        ) {
          return a.address.localeCompare(b.address);
          // return a.address.length - b.address.length;
        } else if (a && a.address && a.address.length) {
          // That means be has null address, so a will come first.
          return -1;
        } else if (b && b.address && b.address.length) {
          // That means a has null address so b will come first.
          return 1;
        }

        // Both rechargeType has null value so there will be no order change.
        return 0;
      },
      ...getColumnSearchProps("address"),
    },
    {
      key: "5",
      title: "Govt. ID",
      dataIndex: "id_num",
      sorter: (a, b) => {
        if (
          a &&
          a.id_num &&
          a.id_num.length &&
          b &&
          b.id_num &&
          b.id_num.length
        ) {
          return a.id_num.localeCompare(b.id_num);
          // return a.id_num.length - b.id_num.length;
        } else if (a && a.id_num && a.id_num.length) {
          // That means be has null id_num, so a will come first.
          return -1;
        } else if (b && b.id_num && b.id_num.length) {
          // That means a has null id_num so b will come first.
          return 1;
        }

        // Both rechargeType has null value so there will be no order change.
        return 0;
      },
      ...getColumnSearchProps("id_num"),
    },
    {
      key: "6",
      title: "Guardian Details",
      dataIndex: "g_name",
      sorter: (a, b) => {
        if (
          a &&
          a.g_name &&
          a.g_name.length &&
          b &&
          b.g_name &&
          b.g_name.length
        ) {
          return a.g_name.localeCompare(b.g_name);
          // return a.g_name.length - b.g_name.length;
        } else if (a && a.g_name && a.g_name.length) {
          // That means be has null g_name, so a will come first.
          return -1;
        } else if (b && b.g_name && b.g_name.length) {
          // That means a has null g_name so b will come first.
          return 1;
        }

        // Both rechargeType has null value so there will be no order change.
        return 0;
      },
      ...getColumnSearchProps("g_name"),
    },
    {
      key: "7",
      title: "Nationality",
      dataIndex: "nationality",
      sorter: (a, b) => {
        if (
          a &&
          a.nationality &&
          a.nationality.length &&
          b &&
          b.nationality &&
          b.nationality.length
        ) {
          return a.nationality.localeCompare(b.nationality);
          // return a.nationality.length - b.nationality.length;
        } else if (a && a.nationality && a.nationality.length) {
          // That means be has null nationality, so a will come first.
          return -1;
        } else if (b && b.nationality && b.nationality.length) {
          // That means a has null nationality so b will come first.
          return 1;
        }

        // Both rechargeType has null value so there will be no order change.
        return 0;
      },
      ...getColumnSearchProps("nationality"),
    }
  ];




  const fields = {
    name: "Name",
    age: "Age/Sex", 
    mobile: "Mobile",
    address: "Address",
    id_num: "Govt ID",
    g_name: "Guardian Details",
    nationality: "Nationality"
  };

  var filteredData = "";
  if(dataSource !== ""){
   filteredData = dataSource.filter((record) =>
  
  Object.values(record)
    .join(' ')
    .toLowerCase()
    .includes(typeof(searchTextGlobal) === "string" && searchTextGlobal? searchTextGlobal.toLowerCase() : searchTextGlobal)
    
);
  }



  return (
    <>
      <div className="content-wrapper">
        <section className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="card">
                  <div className="card-header">
                    <h4 className="card-title">Registration Details</h4>
                    <p style={{width:"200px", height:"50px",borderColor:'black',marginRight:'90%',color:'blue'}} onClick={()=> {handleNavigate()}}><u>Go to Registration Page</u></p>
                  </div>
                  <div className="card-body">
                  <Input.Search
        placeholder="Search"
        allowClear
        enterButton
        value={searchTextGlobal}
        onChange={(e) => setSearchTextGlobal(e.target.value)}
        onSearch={() => setSearchTextGlobal(searchTextGlobal.toLowerCase())}
        style={{align:'right',marginLeft:'30%',width:'70%'}}
      />

                    <Table
                      columns={columns}
                      dataSource={typeof(searchTextGlobal) === 'string' && searchTextGlobal ? filteredData : dataSource}
                      bordered
                      pagination={{
                        defaultPageSize: 10,
                        showSizeChanger: true,
                        pageSizeOptions: ["10", "50", "100"],
                      }}
                      style={{ width: "100%", overflow: "scroll" }}
                      rowKey="seq"
                      tableHeadProps={{ color: "light" }}
                      
                      exportable
                      exportableProps={{
                        fields,
                        btnProps: {
                          type: "primary",
                          icon: <FileExcelOutlined />,
                          children: <span>Export to CSV</span>,
                        },
                        showColumnPicker: true,
                        fileName: "Continous_table",
                      }}
                    ></Table>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default Table1;