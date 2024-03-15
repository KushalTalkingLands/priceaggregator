export class ExceptionConstant{
    public static readonly CreatePlot = "Error Creating Plot"
    public static readonly PlotAggregate = "Error aggregating plots by price"
    public static readonly PlotUpdate = "Error updating plot"
    public static readonly PlotDelete = "Error deleting plot"
    public static readonly PlotFindAll = "Error finding all plots"
    public static readonly PlotFindOne = "Error finding one plot"
    public static readonly PlotNotFound = "Error Plot Not found"

    //User Constants
    public static readonly ConflictException = "Username already exists."
    public static readonly UnauthorizedException = 'Invalid credentials.'
    public static readonly NotFoundException = 'User not found.'
}