'use client'
import { Table, Button, Popconfirm, notification } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { PlusOutlined, DeleteTwoTone, EditTwoTone } from '@ant-design/icons';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import CreateUser from './create.user';
import { useState } from 'react';
import UpdateUser from './update.user';
import { sendRequest } from '@/app/utils/api';
import { IUser, PUser } from '@/app/types/next-auth';
import { deleteUser } from '../action/createUser';

interface DataType {
    id: string;
    email: string;
    name: string;
    role: string;
}


interface IProps {
    raw: IModelPaginate<PUser>,
    access_token?: string;
}
const TableUser = (props: IProps) => {
    const { raw, access_token } = props;
    const router = useRouter()

    const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState<boolean>(false);
    const [dataUpdate, setDataUpdate] = useState<any>(null);

    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const handleDeleteUser = async (user: any) => {
        const res = await deleteUser(user)
        if (+res < 400) {
            notification.success({
                message: "Xóa user thành công."
            })

            router.refresh()
        } else {
            notification.error({
                message: JSON.stringify("Xoa User That Bai")
            })
        }
    };

    const columns: ColumnsType<PUser> = [
        {
            title: 'Email',
            dataIndex: 'email',
        },
        {
            title: 'Name',
            dataIndex: 'name',
        },
        {
            title: 'Role',
            dataIndex: 'roles',
        },

        {
            title: 'Actions',
            align: "center",
            render: (text, record, index) => {
                return (
                    <>
                        <EditTwoTone
                            twoToneColor="#f57800" style={{ cursor: "pointer", margin: "0 20px" }}
                            onClick={() => {
                                setIsUpdateModalOpen(true);
                                console.log(record)
                                setDataUpdate(record);
                            }}
                        />

                        <Popconfirm
                            placement="leftTop"
                            title={"Xác nhận xóa user"}
                            description={"Bạn có chắc chắn muốn xóa user này ?"}
                            onConfirm={() => handleDeleteUser(record)}
                            okText="Xác nhận"
                            cancelText="Hủy"
                        >
                            <span style={{ cursor: "pointer" }}>
                                <DeleteTwoTone twoToneColor="#ff4d4f" />
                            </span>
                        </Popconfirm>
                    </>
                )
            }
        }
    ];

    const onChange = (pagination: any, filters: any, sorter: any, extra: any) => {
        if (pagination && pagination.current) {
            const params = new URLSearchParams(searchParams);
            params.set('page', pagination.current);
            replace(`${pathname}?${params.toString()}`);
        }
    };

    const renderHeader = () => {
        return (
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Table List Users</span>
                <Button
                    icon={<PlusOutlined />}
                    type="primary"
                    onClick={() => setIsCreateModalOpen(true)}
                >
                    Thêm mới
                </Button>
            </div>
        )
    }

    return (
        <>
            <Table
                title={renderHeader}
                columns={columns}
                dataSource={raw?.result}
                bordered
                // pagination={raw?.data?.meta}
                pagination={
                    {

                        // current: current,
                        pageSize: raw?.meta.pageSize,
                        total: raw?.meta.totalsItems,

                        showTotal: (total, range) => {
                            return (<div> {range[0]}-{range[1]} trên {total} rows</div>)
                        }
                    }
                }
                onChange={onChange}
                rowKey="_id"
            />
            <CreateUser
                access_token={access_token}
                isCreateModalOpen={isCreateModalOpen}
                setIsCreateModalOpen={setIsCreateModalOpen}
            />
            <UpdateUser
                access_token={access_token}
                isUpdateModalOpen={isUpdateModalOpen}
                setIsUpdateModalOpen={setIsUpdateModalOpen}
                dataUpdate={dataUpdate}
            />
        </>
    )
}
export default TableUser;