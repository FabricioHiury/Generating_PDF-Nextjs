import React from "react";
import ReactDOM from "react-dom";

//import { Box } from '@material-ui/core';
import { Page, Text, View, Document, StyleSheet, Image, Font } from '@react-pdf/renderer';
import { PDFDownloadLink } from '@react-pdf/renderer';

import { HeaderButton } from '../HeaderActions';

import { formatarCpf, formatarData, formatarRG } from '../Utils/masks';
//import FormatarData from '../../../Utils/FormatarData';

//import RobotoBold from "../Fonts/Roboto/Roboto-Bold.ttf";

import CodhabHeader from '../Images/CodhabHeader.png';
import AssinaturaFichaDescritiva from '../Images/AssinaturaFichaDescritiva.png';
import GovernoBrasiliaFichaDescritiva from '../Images/GovernoBrasiliaFichaDescritiva.png';
import ImpressoraIcon from '../Icons/ImpressoraIcon.svg';

//import { useSelector } from 'react-redux';
/*import { getDadosFichaDescritiva } from '../../../Utils/ApiHelper';
import { useAuth } from '../../../Hooks/useAuth';*/
import { useParams } from "react-router-dom";

Font.register({
  family: 'Roboto',
  fonts: [
    {
      //src: RobotoBold,
      fontWeight: 'bold',
    },
  ],
});

export default function EmitirFicha() {
  const [loading, setLoading] = React.useState(true);
  const [erro, setErro] = React.useState('');
  const [dados, setDados] = React.useState({});
  const { enderecoId } = useParams();
  // const { endereco } = useSelector((state) => state.enderecoReducer);
  //const { currentUser } = useAuth();

  React.useEffect(() => {
    getDadosFichaDescritiva(enderecoId)
      .then((response) => {
        setDados(response.data);
      })
      .catch(() => {
        setErro(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading)
    return (
      <HeaderButton variant="outlined" startIcon={<img src={ImpressoraIcon} />} disabled={true}>
        Carregando
      </HeaderButton>
    );

  if (erro) {
    <HeaderButton variant="outlined" startIcon={<img src={ImpressoraIcon} />} disabled={true}>
      Erro ao gerar ficha
    </HeaderButton>;
  } 

  return (
    <React.Fragment>
      <HeaderButton variant="outlined" startIcon={<img src={ImpressoraIcon}  />}>
        <PDFDownloadLink
          document={<FichaDescritiva dados={dados} nomeAtendente={currentUser?.name} />}
          fileName={'ficha-descritiva.pdf'}
          style={{ color: '#000', textDecoration: 'none' }}
        >
          Ficha descritiva
        </PDFDownloadLink>
      </HeaderButton>
    </React.Fragment>
  );
}

const FichaDescritiva = ({ dados = {}, nomeAtendente = '' }) => {
  return (
    <Document>
      <Page size="A4" style={pdfStyles.page}> 
        <Image src={GovernoBrasiliaFichaDescritiva} style={pdfStyles.pageBackground} />

        <View style={pdfStyles.centralizar}>
          <Image src={CodhabHeader} />
        </View>

        <View style={pdfStyles.centralizar}>
          <Text style={pdfStyles.tituloCodhab}>CODHAB-DF</Text>
        </View>

        <View style={pdfStyles.centralizar}>
          <Text style={pdfStyles.subtitulo}>FICHA DESCRITIVA PARA LAVRATURA DE ESCRITURA DE IMÓVEL</Text>
        </View>

        <View>
          <Text style={pdfStyles.numeroFicha}>Nº da Ficha: {dados.numero_ficha}</Text>
        </View>

        <View>
          <Text style={pdfStyles.identificacaoBeneficiarios}>IDENTIFICAÇÃO DO(S) BENEFICIÁRIO(S)</Text>
        </View>

        <View style={{ flexDirection: 'column', marginTop: '10px' }}>
          <View style={pdfStyles.row}>
            <Text style={pdfStyles.textoNegrito}>Nome: </Text>
            <Text style={pdfStyles.texto}>{String(dados.nome || '').toUpperCase()}</Text>
          </View>

          <View style={pdfStyles.row}>
            <View style={{ flex: 1, flexDirection: 'row' }}>
              <Text style={pdfStyles.textoNegrito}>CPF: </Text>
              <Text style={pdfStyles.texto}>{formatarCpf(dados.cpf || '')}</Text>
            </View>

            <View style={{ flex: 1, flexDirection: 'row' }}>
              <Text style={pdfStyles.textoNegrito}>RG: </Text>
              <Text style={pdfStyles.texto}>{formatarRG(dados.rg || '')}</Text>
            </View>

            <View style={{ flex: 1, flexDirection: 'row' }}>
              <Text style={pdfStyles.textoNegrito}>Orgão emissor: </Text>
              <Text style={pdfStyles.texto}>{String(dados.orgao_emissor || '').toUpperCase()}</Text>
            </View>
          </View>

          <View style={pdfStyles.row}>
            <View style={{ flex: 1, flexDirection: 'row' }}>
              <Text style={pdfStyles.textoNegrito}>Naturalidade: </Text>
              <Text style={pdfStyles.texto}>{dados.naturalidade}</Text>
            </View>

            <View style={{ flex: 1, flexDirection: 'row' }}>
              <Text style={pdfStyles.textoNegrito}>Estado civil: </Text>
              <Text style={pdfStyles.texto}>{dados.estado_civil}</Text>
            </View>

            <View style={{ flex: 1, flexDirection: 'row' }}>
              <Text style={pdfStyles.textoNegrito}>Contato do ocupante: </Text>
              <Text style={pdfStyles.texto}>{dados?.contato_ocupante}</Text>
            </View>
          </View>
        </View>

        {Object.keys(dados.conjuge).length ? (
          <View style={{ flexDirection: 'column', marginTop: '30px' }}>
            <View style={[pdfStyles.row, { marginBottom: '30px' }]}>
              <Text style={pdfStyles.textoNegrito}>Dados Cônjuge: </Text>
            </View>

            <View style={pdfStyles.row}>
              <View style={{ flex: 2, flexDirection: 'row' }}>
                <Text style={pdfStyles.textoNegrito}>Nome: </Text>
                <Text style={pdfStyles.texto}>{String(dados.conjuge.nome || '').toUpperCase()}</Text>
              </View>

              <View style={{ flex: 1, flexDirection: 'row' }}>
                <Text style={pdfStyles.textoNegrito}>CPF: </Text>
                <Text style={pdfStyles.texto}>{formatarCpf(dados.conjuge.cpf || '')}</Text>
              </View>
            </View>

            <View style={pdfStyles.row}>
              <View style={{ flex: 1, flexDirection: 'row' }}>
                <Text style={pdfStyles.textoNegrito}>RG: </Text>
                <Text style={pdfStyles.texto}>{formatarRG(dados.conjuge.rg_familiar || '')}</Text>
              </View>

              <View style={{ flex: 1, flexDirection: 'row' }}>
                <Text style={pdfStyles.textoNegrito}>Orgão emissor: </Text>
                <Text style={pdfStyles.texto}>{String(dados.conjuge.emissor_rg || '').toUpperCase()}</Text>
              </View>

              <View style={{ flex: 1, flexDirection: 'row' }}>
                <Text style={pdfStyles.textoNegrito}>Naturalidade: </Text>
                <Text style={pdfStyles.texto}>{dados.conjuge.naturalidade}</Text>
              </View>
            </View>
          </View>
        ) : (
          <View></View>
        )}

        {dados.herdeiros.length ? (
          <View style={{ marginTop: '25px' }}>
            <View>
              <Text style={pdfStyles.identificacaoBeneficiarios}>COADQUIRENTES/HERDEIROS</Text>
            </View>

            <View style={pdfStyles.table}>
              <View style={pdfStyles.tableRow}>
                <Text style={[pdfStyles.tableHeaderText, { flex: 5 }]}>Nome</Text>
                <Text style={[pdfStyles.tableHeaderText, { flex: 1.5 }]}>CPF</Text>
                <Text style={[pdfStyles.tableHeaderText, { flex: 1 }]}>RG</Text>
                <Text style={[pdfStyles.tableHeaderText, { flex: 1.5 }]}>Estado Civil</Text>
                <Text style={[pdfStyles.tableHeaderText, { flex: 1.8 }]}>Data Nascimento</Text>
                <Text style={[pdfStyles.tableHeaderText, { flex: 1.5 }]}>Porcentagem</Text>
              </View>

              {dados.herdeiros.map((herdeiro) => (
                <View key={herdeiro.id} style={pdfStyles.tableBodyRow}>
                  <Text style={[pdfStyles.tableBodyText, { flex: 5 }]}>{herdeiro.nome}</Text>
                  <Text style={[pdfStyles.tableBodyText, { flex: 1.5 }]}>{herdeiro.cpf}</Text>
                  <Text style={[pdfStyles.tableBodyText, { flex: 1 }]}>{herdeiro.rg}</Text>
                  <Text style={[pdfStyles.tableBodyText, { flex: 1.5 }]}>{herdeiro.estado_civil.nome}</Text>
                  <Text style={[pdfStyles.tableBodyText, { flex: 1.8 }]}>
                    {herdeiro.data_nascimento ? formatarData(herdeiro.data_nascimento, 'dd/MM/yyyy') : ''}
                  </Text>
                  <Text style={[pdfStyles.tableBodyText, { flex: 1.5 }]}>{herdeiro.porcentagem + '%'}</Text>
                </View>
              ))}
            </View>
          </View>
        ) : (
          <View></View>
        )}

        <View
          style={{
            marginTop: '60px',
            //marginBottom: '100px',
            borderBottom: '2px',
            borderBottomColor: '#cacaca',
            paddingBottom: '5px',
          }}
        >
          <View>
            <Text style={pdfStyles.identificacaoBeneficiarios}>IDENTIFICAÇÃO DO IMÓVEL</Text>
          </View>

          <View style={{ flexDirection: 'row' }}>
            <View style={{ flexDirection: 'column', flex: 1, gap: '10px' }}>
              <View style={pdfStyles.row}>
                <Text style={pdfStyles.textoNegrito}>Endereço: </Text>
                <Text style={pdfStyles.texto}>{dados.endereco}</Text>
              </View>

              <View style={pdfStyles.row}>
                <Text style={pdfStyles.textoNegrito}>Localidade: </Text>
                <Text style={pdfStyles.texto}>{dados.localidade}</Text>
              </View>

              <View style={pdfStyles.row}>
                <Text style={pdfStyles.textoNegrito}>Nº Inscrição IPTU: </Text>
                <Text style={pdfStyles.texto}>{dados?.numero_incricao_iptu}</Text>
              </View>
            </View>

            <View style={{ flexDirection: 'column', flex: 1 }}>
              <View style={{ flexDirection: 'row' }}>
                <View style={{ flex: 4 }}>
                  <View style={pdfStyles.row}>
                    <Text style={pdfStyles.textoNegrito}>Data da distribuição: </Text>
                    <Text style={pdfStyles.texto}>
                      {dados?.data_distribuicao ? formatarData(dados.data_distribuicao, 'dd/MM/yyyy') : ''}
                    </Text>
                  </View>

                  <View style={pdfStyles.row}>
                    <Text style={pdfStyles.textoNegrito}>Matrícula: </Text>
                    <Text style={pdfStyles.texto}>{dados?.matricula}</Text>
                  </View>

                  <View style={pdfStyles.row}>
                    <Text style={pdfStyles.textoNegrito}>Número processo SEI: </Text>
                    <Text style={pdfStyles.texto}>{dados?.numero_processo_sei}</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>

        <View style={{ paddingTop: '10px', marginBottom: '28px' }}>
          <Text style={[pdfStyles.texto, { lineHeight: '1.5px' }]}>
            Observação: Beneficiário originário - O Distrito Federal, por seu representante legal, DECLARA Suspensa a
            Exigibilidade do Imposto sobre a Transmissão Causa Mortis ou Doação de Quaisquer Bens e Direitos - ITCD,
            fundamentada na Lei nº 6466 de 17 de dezembro de 2019, Artigo 06, Incisos I e II, Conforme ato declaratório
            nº {dados?.ato_declaratorio} de{' '}
            {dados?.data_ato_declaratorio ? formatarData(dados.data_ato_declaratorio) : ''} - GEESP/COTRI/SUREC/SEEF.
          </Text>
        </View>

        <View style={{ paddingTop: '10px', marginBottom: '35px', textAlign: 'center' }}>
          <Text style={pdfStyles.texto}>Brasília, {FormatarData(new Date(), 'dd/MM/yyyy')}</Text>
        </View>

        <View style={pdfStyles.centralizar}>
          <Image src={AssinaturaFichaDescritiva} />
        </View>

        <View style={{ marginTop: '40px' }}>
          <Text style={[pdfStyles.texto, { textAlign: 'right', fontSize: '7px' }]}>Emitido por: {nomeAtendente}</Text>
        </View>
      </Page>
    </Document>
  );
};

// Create styles
const pdfStyles = StyleSheet.create({
  page: { flexDirection: 'column', backgroundColor: '#fff', padding: '20px 40px' },
  centralizar: { justifyContent: 'center', alignItems: 'center' },
  alinharFim: { justifyContent: 'flex-end', alignItems: 'center' },
  alinharTextoCentro: { textAlign: 'center' },
  textoNegrito: { fontFamily: 'Roboto', fontWeight: 'bold', fontSize: '9px' },
  texto: { fontWeight: '400', fontSize: '9px', justifyContent: 'center' },
  row: { marginTop: '3px', flexDirection: 'row' },
  tituloCodhab: {
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    fontSize: '10px',
    textTransform: 'uppercase',
    //marginTop: '10px',
  },
  subtitulo: {
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    fontSize: '12px',
    textTransform: 'uppercase',
    textAlign: 'center',
    marginTop: '50px',
  },
  numeroFicha: { fontWeight: '400', fontSize: '7px', textAlign: 'right', marginTop: '20px' },
  identificacaoBeneficiarios: {
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    fontSize: '11px',
    textTransform: 'uppercase',
    textAlign: 'center',
    margin: '20px 0px',
  },

  // imagem de fundo pdf
  pageBackground: {
    position: 'absolute',
    width: '235px',
    alignSelf: 'center',
    opacity: 0.35,
    top: '30%',
  },
  table: {
    border: '1px solid #000',
  },
  tableRow: {
    // border: '1px solid #000',
    textAlign: 'left',
    flexDirection: 'row',
  },
  tableBodyRow: {
    borderTop: '1px solid #000',
    textAlign: 'left',
    flexDirection: 'row',
  },
  tableHeaderText: {
    flex: 1,
    borderRight: '1px solid #000',
    fontSize: '8px',
    fontWeight: 'bold',
    fontFamily: 'Roboto',
    padding: '4px',
  },

  tableBodyText: {
    flex: 1,
    borderRight: '1px solid #000',
    fontSize: '8px',
    padding: '4px',
  },
});
1