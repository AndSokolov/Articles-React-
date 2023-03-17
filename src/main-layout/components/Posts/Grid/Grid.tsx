import React, { FC } from "react";
import { PostI } from "../../../../shared/types/types";
import { Card, List }  from "antd";


interface Props {
    datasource: PostI[]
    toPost: (id: string) => void
}

const Grid: FC<Props> = (props) => {

    return <List
        grid={{gutter: 40, column: 4}}
        dataSource={props.datasource}
        renderItem={(post) => (
            <List.Item onClick={() => {props.toPost(post.id)}}>
                <Card title={post.title}>
                    <div>Date: {post.date}</div>
                    <div>Author: {post.author}</div>
                </Card>
            </List.Item>
        )}
    />
}

export default Grid;
