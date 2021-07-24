"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GroupResolver = void 0;
const Group_1 = require("../entities/Group");
const isAuth_1 = require("../middleware/isAuth");
const type_graphql_1 = require("type-graphql");
let GroupInput = class GroupInput {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], GroupInput.prototype, "name", void 0);
__decorate([
    type_graphql_1.Field(() => [String]),
    __metadata("design:type", Array)
], GroupInput.prototype, "emails", void 0);
GroupInput = __decorate([
    type_graphql_1.InputType()
], GroupInput);
let GroupResolver = class GroupResolver {
    getGroups({ req }) {
        return Group_1.Group.find({
            where: { creatorId: req.session.userId },
            order: { createdAt: "DESC" },
        });
    }
    createGroup(input, { req }) {
        return Group_1.Group.create(Object.assign(Object.assign({}, input), { creatorId: req.session.userId })).save();
    }
};
__decorate([
    type_graphql_1.Query(() => [Group_1.Group]),
    type_graphql_1.UseMiddleware(isAuth_1.isAuth),
    __param(0, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], GroupResolver.prototype, "getGroups", null);
__decorate([
    type_graphql_1.Mutation(() => Group_1.Group),
    __param(0, type_graphql_1.Arg("input")), __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [GroupInput, Object]),
    __metadata("design:returntype", void 0)
], GroupResolver.prototype, "createGroup", null);
GroupResolver = __decorate([
    type_graphql_1.Resolver()
], GroupResolver);
exports.GroupResolver = GroupResolver;
//# sourceMappingURL=group.js.map