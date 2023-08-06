import React from 'react'
import {Container , Row , Col} from "react-bootstrap";

const Footer = () => {
    return (
        <footer className="footer">
            <Container>
                <Row>
                    <Col className="text-center" xs={12} sm={12} md={12} lg={12} xl={12}>
                        <div className="copyright">
                            <p>Copyright © 2023 Mzansie Shopping</p>
                        </div>
                    </Col>
                </Row>
            </Container>
        </footer>
    )
  return (
    <div>Footer</div>
  )
}

export default Footer