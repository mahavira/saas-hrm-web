import { SELECT, INPUT } from '~/constant/formItemType'
const conf = {
  info: {
    label: '在职信息',
    edited: false,
    fields: {
      staffId: {
        label: '选择员工',
        alias: 'name',
        formType: SELECT,
        options: '',
        rules: [{ required: true, message: '请选择员工', trigger: 'blur' }]
      },
      education: {
        label: '学历',
        formType: SELECT,
        options: 'education',
        rules: [{ required: true, message: '请选择学历', trigger: 'blur' }]
      },
      graduatedSchool: {
        label: '毕业院校',
        formType: INPUT,
        rules: [{ required: true, message: '请输入毕业学校', trigger: 'blur' }]
      },
      graduationMajor: {
        label: '毕业专业',
        formType: INPUT,
        rules: [{ required: true, message: '请输入毕业专业', trigger: 'blur' }]
      }
    }
  },
  status: {
    label: '员工状态',
    edited: false,
    fields: {
      staffId: {
        label: '选择员工',
        alias: 'name',
        formType: SELECT,
        options: '',
        rules: [{ required: true, message: '请选择员工', trigger: 'blur' }]
      },
      education: {
        label: '学历',
        formType: SELECT,
        options: 'education',
        rules: [{ required: true, message: '请选择学历', trigger: 'blur' }]
      },
      graduatedSchool: {
        label: '毕业院校',
        formType: INPUT,
        rules: [{ required: true, message: '请输入毕业学校', trigger: 'blur' }]
      },
      graduationMajor: {
        label: '毕业专业',
        formType: INPUT,
        rules: [{ required: true, message: '请输入毕业专业', trigger: 'blur' }]
      }
    }
  },
  dep: {
    label: '附属部门',
    edited: false,
    fields: {
      graduatedSchool: {
        label: '毕业院校',
        formType: INPUT,
        rules: [{ required: true, message: '请输入毕业学校', trigger: 'blur' }]
      },
      graduationMajor: {
        label: '毕业专业',
        formType: INPUT,
        rules: [{ required: true, message: '请输入毕业专业', trigger: 'blur' }]
      }
    }
  },
  probation: {
    label: '考察期信息',
    edited: false,
    fields: {
      graduatedSchool: {
        label: '毕业院校',
        formType: INPUT,
        rules: [{ required: true, message: '请输入毕业学校', trigger: 'blur' }]
      },
      graduationMajor: {
        label: '毕业专业',
        formType: INPUT,
        rules: [{ required: true, message: '请输入毕业专业', trigger: 'blur' }]
      }
    }
  },
  workLogs: {
    label: '任职记录',
    edited: [],
    multiple: true,
    subtitle: '任职',
    fields: {
      graduatedSchool: {
        label: '毕业院校',
        formType: INPUT,
        rules: [{ required: true, message: '请输入毕业学校', trigger: 'blur' }]
      },
      graduationMajor: {
        label: '毕业专业',
        formType: INPUT,
        rules: [{ required: true, message: '请输入毕业专业', trigger: 'blur' }]
      }
    }
  },
  awardLogs: {
    label: '奖惩记录',
    edited: [],
    multiple: true,
    max: 5,
    subtitle: '奖惩',
    fields: {
      graduatedSchool: {
        label: '毕业院校',
        formType: INPUT,
        rules: [{ required: true, message: '请输入毕业学校', trigger: 'blur' }]
      },
      graduationMajor: {
        label: '毕业专业',
        formType: INPUT,
        rules: [{ required: true, message: '请输入毕业专业', trigger: 'blur' }]
      }
    }
  }
}
export default conf 