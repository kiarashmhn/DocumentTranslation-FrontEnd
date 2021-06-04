import React, { Component, Fragment } from "react";
import * as PropTypes from "prop-types";

import axios from "axios";
import MUIDataTable from "mui-datatables";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";

import CircularIndeterminate from "../Progress/CircularProgress";
import * as Validator from "../utils/Validator";

import GlobalErrorChecker from "../GlobalErrorChecker/GlobalErrorChecker";
import Filter from "../Filter/Filter";
import theme from "../../theme";
import Typography from "@material-ui/core/Typography";
import { Box } from "@material-ui/core";

export default class MUITable extends Component {
  constructor(props) {
    super(props);

    this.tableRef = React.createRef();

    this.globalErrorChecker = new GlobalErrorChecker();

    this.state = {
      page: 0,
      count: 0,
      data: [["..."]],
      isLoading: false,
      currentFilters: {}
    };
  }

  componentDidMount() {
    this.getData();
  }

  shouldComponentUpdate() {
    return this.state.data !== [["..."]];
  }

  getData = filterInputs => {
    let initialFilters = {
      ...this.props.initializationFilter,
      ...filterInputs
    };
    this.setState(
      {
        currentFilters: initialFilters,
        count: 0
      },
      () => {
        this.tableRef.current.changePage(0);
      }
    );
  };

  generateFilters = (filterInputs, structure) => {
    if (!Validator.notNull(structure)) return filterInputs;
    let filters = {};
    let self = this;

    Object.keys(structure).forEach(function(key) {
      if (structure[key]) {
        let subFilters = self.generateFilters(filterInputs, structure[key]);
        if (!Validator.isEmptyObject(subFilters)) filters[key] = subFilters;
      } else if (filterInputs[key]) filters[key] = filterInputs[key];
    });
    return filters;
  };

  xhrRequest = (begin, filterInputs) => {
    let checker = this.globalErrorChecker;

    let postData = {
      begin: begin,
      length: 10,
      ...this.generateFilters(
        { ...filterInputs, ...this.props.additionalData },
        null
      )
    };

    return this.props.method === "Get"
      ? axios({
          method: this.props.method,
          url: this.props.url,
          params: postData,
          headers: {
            Authorization: localStorage.getItem("id_token")
          }
        })
          .then(function(response) {
            checker.checkResponse(response);
            return response.data;
          })
          .catch(function(error) {
            // eslint-disable-next-line no-console
            console.log(error);
          })
      : axios({
          method: this.props.method,
          url: this.props.url,
          data: postData,
          headers: {
            Authorization: localStorage.getItem("id_token")
          }
        })
          .then(function(response) {
            checker.checkResponse(response);
            return response.data;
          })
          .catch(function(error) {
            checker.redirectToLogin();
            // eslint-disable-next-line no-console
            console.log(error);
          });
  };

  reload = () => {
    this.changePage(this.state.page);
  };

  changePage = page => {
    this.setState({
      isLoading: true,
      data: [["..."]]
    });

    let begin = page * 10;

    this.xhrRequest(begin, this.state.currentFilters).then(res => {
      let data = res.data;

      if (Validator.isFunction(this.props.doDataPreprocessing))
        data = this.props.doDataPreprocessing(data);

      this.setState({
        isLoading: false,
        page: page,
        data: data,
        count: res.count
      });
    });
  };

  getMuiTheme = () =>
    createMuiTheme({
      overrides: {
        MuiTableCell: {
          root: {
            textAlign: "center",
            fontFamily: "MyFont",
            padding: "4px 7px 4px 7px"
          }
        },
        MUIDataTable: {
          root: {
            fontFamily: "MyFont"
          },
          caption: {
            display: "none"
          }
        },
        MuiTableFooter: {
          root: {
            textAlign: "center",
            fontFamily: "MyFont"
          }
        },
        MuiTableBody: {
          root: {
            fontFamily: "MyFont"
          }
        },
        MuiTableBodyCell: {
          root: {
            fontFamily: "MyFont"
          }
        },
        MuiTypography: {
          subtitle1: {
            fontFamily: "MyFont",
            paddingRight: "10%"
          },
          caption: {
            fontFamily: "MyFont"
          },
          root: {
            fontFamily: "MyFont !important"
          }
        },
        MUIDataTableHeadCell: {
          root: {
            fontFamily: "MyFont"
          },
          sortAction: {
            display: "block"
          }
        },
        MuiPaper: {
          root: {
            fontFamily: "MyFont",
            width: "100%"
          }
        }
      }
    });

  render() {
    const columns = this.props.columns;
    const { data, page, count, isLoading } = this.state;

    const options = {
      customToolbar: this.props.filter
        ? () => {
            return (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <Filter
                  componentTitle={this.props.filter.componentTitle}
                  staticData={this.props.filter.staticData}
                  filterKey={this.props.filterKey}
                  refreshFunction={this.getData}
                />
              </div>
            );
          }
        : () => {},
      filter: false,
      search: false,
      print: false,
      sort: false,
      download: false,
      filterType: "dropdown",
      serverSide: true,
      count: count,
      page: page,
      pagination: true,
      rowsPerPageOptions: [10],
      selectableRows: "none",
      responsive: "standard", //or vertical
      viewColumns: false,
      onTableChange: (action, tableState) => {
        if (action === "changePage") {
          this.changePage(tableState.page);
        }
      },
      textLabels: {
        body: {
          noMatch: "Iّl n'y a pas de résultats / موردی یافت نشد",
          toolTip: "مرتب"
        },
        pagination: {
          next: "بعدی",
          previous: "قبلی",
          rowsPerPage: "تعداد در صفحه",
          displayRows: "/"
        },
        toolbar: {
          search: "جستجو",
          downloadCsv: "دریافت CSV",
          print: "چاپ",
          viewColumns: "مشاهده ستون ها",
          filterTable: "فیلتر جدول"
        },
        filter: {
          all: "همه",
          title: "فیلترها",
          reset: "ریست"
        },
        viewColumns: {
          title: "نمایش ستون ها",
          titleAria: "نمایش/مخفی ستون های جدول"
        },
        selectedRows: {
          text: "مورد انتخاب شده",
          delete: "حذف",
          deleteAria: "حذف مورد انتخاب شده"
        }
      }
    };
    return (
      <Fragment>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <Typography style={{ marginBottom: theme.spacing(2) }}>
            <Box
              style={{
                fontWeight: "bold"
              }}
            >
              {this.props.title}
            </Box>
          </Typography>
          {isLoading && <CircularIndeterminate />}
        </div>
        <MuiThemeProvider theme={this.getMuiTheme()}>
          <MUIDataTable
            innerRef={this.tableRef}
            title={
              <>
                {this.props.title}
                {isLoading && <CircularIndeterminate />}
              </>
            }
            data={data}
            columns={columns}
            options={options}
            components={{
              TableToolbar: () => {
                return (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: "10px"
                    }}
                  >
                    <Filter
                      componentTitle={this.props.filter.componentTitle}
                      staticData={this.props.filter.staticData}
                      refreshFunction={this.getData}
                      initial={this.state.currentFilters}
                    />
                    {this.props.otherOptions ? (
                      this.props.otherOptions
                    ) : (
                      <div />
                    )}
                  </div>
                );
              }
            }}
          />
        </MuiThemeProvider>
      </Fragment>
    );
  }
}

MUITable.propTypes = {
  title: PropTypes.string,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired
    })
  ),
  url: PropTypes.string.isRequired,
  method: PropTypes.string.isRequired,
  additionalData: PropTypes.object,
  filter: PropTypes.shape({
    componentTitle: PropTypes.string.isRequired,
    staticData: PropTypes.array.isRequired
  }),
  initializationFilter: PropTypes.any,
  filterKey: PropTypes.string,
  doDataPreprocessing: PropTypes.func,
  otherOptions: PropTypes.any
};
