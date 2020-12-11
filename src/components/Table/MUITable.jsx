import React, { Component, Fragment } from "react";
import * as PropTypes from "prop-types";

import axios from "axios";
import MUIDataTable from "mui-datatables";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";

import CircularIndeterminate from "../Progress/CircularProgress";
import * as Validator from "../utils/Validator";

import GlobalErrorChecker from "../GlobalErrorChecker/GlobalErrorChecker";

export default class MUITable extends Component {
  constructor(props) {
    super(props);

    this.tableRef = React.createRef();

    this.globalErrorChecker = new GlobalErrorChecker();

    this.state = {
      page: 0,
      count: 0,
      data: [["در حال دریافت..."]],
      isLoading: false,
      currentFilters: {}
    };
  }

  componentDidMount() {
    this.getData();
  }

  shouldComponentUpdate() {
    if (this.state.data === [["در حال دریافت..."]]) return false;
    else return true;
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
        this.props.filter ? this.props.filter.structure : null
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

  changePage = (page, tableState) => {
    this.setState({
      isLoading: true,
      data: [["در حال دریافت..."]]
    });

    let begin = page * tableState.rowsPerPage;

    this.xhrRequest(begin, this.state.currentFilters).then(res => {
      let data = res.data;

      if (Validator.isFunction(this.props.doDataPreprocessing))
        data = this.props.doDataPreprocessing(data);

      this.setState({
        isLoading: false,
        page: page,
        data: data,
        count: res.data.count
      });
    });
  };

  getMuiTheme = () =>
    createMuiTheme({
      overrides: {
        MuiTableCell: {
          root: {
            textAlign: "center",
            fontFamily: "inherit",
            padding: "4px 40px 4px 16px"
          }
        },
        MUIDataTable: {
          caption: {
            display: "none"
          }
        },
        MuiTableFooter: {
          root: {
            textAlign: "center",
            fontFamily: "MyFont",
            direction: "rtl"
          }
        },
        MuiTableBody: {
          root: {
            fontFamily: "MyFont"
          }
        },
        MuiTypography: {
          subtitle1: {
            fontFamily: "MyFont",
            paddingRight: "20%"
          },
          caption: {
            fontFamily: "MyFont"
          },
          root: {
            fontFamily: "MyFont !important"
          }
        },
        MUIDataTableHeadCell: {
          sortAction: {
            display: "block"
          }
        },
        MuiPaper: {
          root: {
            width: "100%",
            direction: "rtl"
          }
        }
      }
    });

  render() {
    const columns = this.props.columns;
    const { data, page, count, isLoading } = this.state;

    const options = {
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
          this.changePage(tableState.page, tableState);
        }
      },
      textLabels: {
        body: {
          noMatch: "متاسفانه موردی یافت نشد",
          toolTip: "مرتب"
        },
        pagination: {
          next: "بعدی",
          previous: "قبلی",
          rowsPerPage: "تعداد در صفحه",
          displayRows: "از"
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
    staticData: PropTypes.array.isRequired,
    componentsData: PropTypes.arrayOf(
      PropTypes.shape({
        component: PropTypes.element
      })
    ),
    structure: PropTypes.any
  }),
  initializationFilter: PropTypes.any,
  filterKey: PropTypes.string,
  doDataPreprocessing: PropTypes.func
};
