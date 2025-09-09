import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { getVisitStatistics } from "../api/statisticsApi";
import { StatusMessage } from './StatusMessage';
import styled from "styled-components";

const ContainerStyle = styled.div`
   display: flex;
   flex-direction: column;
   align-items: center;

   h5 {
      text-align: center;
      color: ${({ theme }) => theme.visitorStatistics.h5};
      margin: 10px 10px;
   }

   @media (max-width: 992px) {
      margin-top: 20px;

      h5 {
         margin: 0 10px 10px;
      }
   }
`;

const TableStyle = styled.table`
   border-collapse: collapse;
   font-size: 14px;

   td, th {
      border: 2px solid ${({theme}) => theme.visitorStatistics.table.border}; 
      text-align: center;
      padding: 0 5px;
   }

   th {
      color: ${({theme}) => theme.visitorStatistics.table.th};
   }

   td {
      color: ${({theme}) => theme.visitorStatistics.table.td};
      text-align: center;
   }
`;

const VisitorStatistics = () => {
   const tokenAdmin = useSelector((state) => state.admin.value)
   const [fetchMessage, setFetchMessage] = useState('')
   const [dataStatistics, setDataStatistics] = useState()
   const { t } = useTranslation()


   useEffect(() => {
      const dataFetch = async () => {
         const response = await getVisitStatistics(tokenAdmin, t)

         if (response.success) {
            setDataStatistics(response.statistics)
         } else {

            setFetchMessage(response.message)
            setTimeout(() => setFetchMessage(''), 2000)
         }
      }

      dataFetch()
   }, [])

   return (
      <ContainerStyle>
         <h5>{t("pages.admin.statistics.h5")}</h5>
         <TableStyle>
            <thead>
               <tr>
                  <th>{t("pages.admin.statistics.thead.th1")}</th>
                  <th>{t("pages.admin.statistics.thead.th2")}</th>
                  <th>{t("pages.admin.statistics.thead.th3")}</th>
               </tr>
            </thead>
            <tbody>
               {dataStatistics?.sort((a, b) => new Date(b.visit_date) - new Date(a.visit_date)).map((elem, index) => (
                  <tr key={index}>
                     <td>{index + 1}</td>
                     <td>{new Date(elem.visit_date).toLocaleDateString()}</td>
                     <td>{elem.visit_count}</td>
                  </tr>
               ))}
            </tbody>
         </TableStyle>
         <StatusMessage>{fetchMessage}</StatusMessage>
      </ContainerStyle>
   )
};

export default VisitorStatistics;