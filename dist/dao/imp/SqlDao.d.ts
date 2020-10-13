import Dao from '../Dao';
import AddSql from '../builder/imp/sql/AddSql';
import AddArraySql from '../builder/imp/sql/AddArraySql';
import UpdateSql from '../builder/imp/sql/UpdateSql';
import UpdateArraySql from '../builder/imp/sql/UpdateArraySql';
import DelSql from '../builder/imp/sql/DelSql';
import DeleteArraySql from '../builder/imp/sql/DeleteArraySql';
import FindSql from '../builder/imp/sql/FindSql';
import FindCntSql from '../builder/imp/sql/FindCntSql';
import FindOneSql from '../builder/imp/sql/FindOneSql';
import FindByIdSql from '../builder/imp/sql/FindByIdSql';
import { DelByQuery } from '../builder/imp/sql';
export default abstract class SqlDao extends Dao {
    protected _initMap(): {
        add: typeof AddSql;
        addArray: typeof AddArraySql;
        update: typeof UpdateSql;
        updateArray: typeof UpdateArraySql;
        del: typeof DelSql;
        delArray: typeof DeleteArraySql;
        find: typeof FindSql;
        findCnt: typeof FindCntSql;
        findOne: typeof FindOneSql;
        findById: typeof FindByIdSql;
        delByQuery: typeof DelByQuery;
    };
}
